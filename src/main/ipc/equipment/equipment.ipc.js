import electron from 'electron'
import { DatabaseOrm } from '../../database/modules/orm/orm.js'

export class EquipmentIpc {
  static create = () => {
    electron.ipcMain.handle('equipment:create', (_event, payload) => {
      return DatabaseOrm.Transaction(() => {
        const equipment = DatabaseOrm.Insert({
          table: 'equipment',
          data: {
            id: payload.id ?? crypto.randomUUID(),

            equipment_type_id: payload.equipmentTypeId ?? null,
            category_id: payload.categoryId ?? null,

            title: payload.title ?? '',
            description: payload.description ?? '',

            asset_tag: payload.assetTag ?? null,
            serial_number: payload.serialNumber ?? null,

            manufacturer: payload.manufacturer ?? null,
            model_number: payload.modelNumber ?? null,

            purchase_date: payload.purchaseDate ?? null,
            warranty_expiry: payload.warrantyExpiry ?? null,

            current_quantity: payload.quantityOnHand ?? 1,
            current_condition: payload.condition?.current ?? null,
            current_status: payload.status ?? null,

            notes: payload.notes ?? null,

            updated_at: null
          }
        })

        const components = []

        for (const component of payload.components ?? []) {
          const createdComponent = DatabaseOrm.Insert({
            table: 'equipment_components',
            data: {
              id: component.id ?? crypto.randomUUID(),
              equipment_id: equipment.id,
              component: component.name ?? ''
            }
          })

          components.push(createdComponent)
        }

        return {
          success: true,
          message: 'Equipment created successfully.',
          data: {
            equipment,
            components
          }
        }
      })
    })
  }
  static update = () => {
    electron.ipcMain.handle('equipment:update', (_event, payload) => {
      return DatabaseOrm.Transaction(() => {
        if (!payload?.id) {
          throw new Error('Equipment ID is required.')
        }

        const existingEquipment = DatabaseOrm.SelectOne({
          sql: `
          SELECT
            e.*,
            et.name AS equipment_type,
            ec.name AS category_name
          FROM equipment e
          LEFT JOIN equipment_types et
            ON et.id = e.equipment_type_id
          LEFT JOIN equipment_categories ec
            ON ec.id = e.category_id
          WHERE e.id = ?
        `,
          params: [payload.id]
        })

        if (!existingEquipment) {
          throw new Error(`Equipment "${payload.id}" was not found.`)
        }

        const updatedAt = new Date().toDateString()

        /*
         * Determine what kind of equipment we are updating.
         *
         * The exact value depends on how you seed equipment_types.
         */
        const equipmentType = payload.equipmentType ?? existingEquipment.equipment_type

        const isSupply =
          equipmentType?.toLowerCase() === 'supply' || equipmentType?.toLowerCase() === 'supplies'

        const isCapitalAsset =
          equipmentType?.toLowerCase() === 'capital_asset' ||
          equipmentType?.toLowerCase() === 'capital asset'

        /*
         * Update parent equipment record.
         */
        const equipment = DatabaseOrm.Update({
          table: 'equipment',

          data: {
            title: payload.title ?? payload.name ?? '',
            description: payload.description ?? '',

            asset_tag: payload.assetTag ?? null,

            manufacturer: payload.manufacturer ?? payload.brand ?? null,

            model_number: payload.modelNo ?? null,

            current_quantity: payload.quantityOnHand ?? 0,

            current_condition:
              typeof payload.condition === 'object'
                ? payload.condition.current
                : (payload.condition ?? null),

            current_status: payload.currentStatus ?? payload.status ?? null,

            notes: payload.notes ?? null,

            updated_at: updatedAt
          },

          condition: {
            id: payload.id
          }
        })

        if (!equipment) {
          throw new Error(`Failed to update equipment "${payload.id}".`)
        }

        /*
         * Synchronize components.
         *
         * For now we use a simple strategy:
         * remove the existing component records and recreate
         * them from the submitted payload.
         *
         * Because this happens inside the transaction, it is safe.
         */
        DatabaseOrm.Delete({
          table: 'equipment_components',
          condition: {
            equipment_id: payload.id
          }
        })

        const components = []

        for (const component of payload.components ?? []) {
          const createdComponent = DatabaseOrm.Insert({
            table: 'equipment_components',

            data: {
              id: component.id ?? crypto.randomUUID(),
              equipment_id: payload.id,
              component: component.name ?? ''
            }
          })

          components.push(createdComponent)
        }

        /*
         * Return the renderer-facing structure rather
         * than the raw database structure.
         */

        if (isSupply) {
          return {
            success: true,
            message: 'Supply updated successfully.',

            data: {
              id: equipment.id,
              name: equipment.title,
              description: equipment.description,
              category: existingEquipment.category_name ?? '',
              purpose: payload.purpose ?? '',
              quantityOnHand: equipment.current_quantity,

              unitPrice: payload.unitPrice ?? 0,

              condition: equipment.current_condition ?? 'good',

              components: components.map((component, index) => {
                const source = payload.components?.[index]

                return {
                  id: component.id,
                  name: component.component,
                  purpose: source?.purpose ?? '',
                  condition: source?.condition ?? '',
                  quantityOnHand: source?.quantityOnHand ?? 0
                }
              }),

              storageLocation: payload.storageLocation ?? '',

              notes: equipment.notes ?? '',

              createdAt: existingEquipment.created_at,

              updatedAt: equipment.updated_at
            }
          }
        }

        if (isCapitalAsset) {
          return {
            success: true,
            message: 'Capital asset updated successfully.',

            data: {
              id: equipment.id,
              title: equipment.title,
              description: equipment.description,

              assetTag: equipment.asset_tag ?? '',

              brand: equipment.manufacturer ?? '',

              modalNo: equipment.model_number ?? '',

              category: existingEquipment.category_name ?? '',

              manufacturer: equipment.manufacturer ?? '',

              components: components.map((component, index) => {
                const source = payload.components?.[index]

                return {
                  id: component.id,
                  name: component.component,
                  purpose: source?.purpose ?? '',
                  modalNo: source?.modalNo ?? '',
                  quantityOnHand: source?.quantityOnHand ?? 0,
                  quantityIssued: source?.quantityIssued ?? 0
                }
              }),

              quantityOnHand: equipment.current_quantity,

              condition: {
                current: equipment.current_condition ?? '',

                previous: payload.condition?.previous ?? '',

                reason: payload.condition?.reason ?? ''
              },

              price: {
                current: payload.price?.current ?? 0,

                new: payload.price?.new ?? 0
              },

              isSalvageable: payload.isSalvageable ?? false,

              notes: equipment.notes ?? '',

              createdAt: existingEquipment.created_at,

              updatedAt: equipment.updated_at
            }
          }
        }

        throw new Error(`Unsupported equipment type: ${equipmentType}`)
      })
    })
  }
  static findByid = () => {
    electron.ipcMain.handle('equipment:find-by-id', (_event, id) => {
      if (!id) {
        return {
          success: false,
          message: 'Equipment ID is required.',
          data: null
        }
      }

      /*
       * ---------------------------------------------------------
       * 1. Find the main equipment record
       * ---------------------------------------------------------
       */

      const equipment = DatabaseOrm.SelectOne({
        sql: `
        SELECT
          e.*,

          et.name AS equipment_type,
          ec.name AS category_name

        FROM equipment e

        LEFT JOIN equipment_types et
          ON et.id = e.equipment_type_id

        LEFT JOIN equipment_categories ec
          ON ec.id = e.category_id

        WHERE e.id = ?
      `,
        params: [id]
      })

      if (!equipment) {
        return {
          success: false,
          message: `Equipment "${id}" was not found.`,
          data: null
        }
      }

      /*
       * ---------------------------------------------------------
       * 2. Find all components belonging to this equipment
       * ---------------------------------------------------------
       */

      const components = DatabaseOrm.Select({
        sql: `
        SELECT
          id,
          equipment_id,
          component,
          purpose,
          model_number,
          quantity_on_hand,
          quantity_issued,
          current_condition

        FROM equipment_components

        WHERE equipment_id = ?
      `,
        params: [id]
      })

      /*
       * ---------------------------------------------------------
       * 3. Determine equipment type
       * ---------------------------------------------------------
       */

      const equipmentType = equipment.equipment_type?.toLowerCase().trim()

      /*
       * ---------------------------------------------------------
       * 4. CAPITAL ASSET
       * ---------------------------------------------------------
       */

      if (equipmentType === 'capital_asset' || equipmentType === 'capital asset') {
        const capitalAsset = DatabaseOrm.SelectOne({
          sql: `
          SELECT
            id,
            equipment_id,
            current_price,
            new_price,
            is_salvageable

          FROM equipment_capital_assets

          WHERE equipment_id = ?
        `,
          params: [id]
        })

        /*
         * If the equipment says it is a capital asset but
         * the type-specific record doesn't exist, we still
         * return the equipment with safe defaults.
         */

        return {
          success: true,
          message: 'Capital asset found successfully.',

          data: {
            id: equipment.id,
            title: equipment.title ?? '',
            description: equipment.description ?? '',
            assetTag: equipment.asset_tag ?? '',
            brand: equipment.manufacturer ?? '',

            modalNo: equipment.model_number ?? '',

            category: equipment.category_name ?? '',

            manufacturer: equipment.manufacturer ?? '',

            components: components.map((component) => ({
              id: component.id,

              name: component.component ?? '',

              purpose: component.purpose ?? '',

              modalNo: component.model_number ?? '',

              quantityOnHand: component.quantity_on_hand ?? 0,

              quantityIssued: component.quantity_issued ?? 0
            })),

            quantityOnHand: equipment.current_quantity ?? 0,

            condition: {
              current: equipment.current_condition ?? '',

              /*
               * These aren't currently represented in the
               * database schema, so return the template shape
               * with safe defaults.
               */
              previous: '',

              reason: ''
            },

            price: {
              current: capitalAsset?.current_price ?? 0,

              new: capitalAsset?.new_price ?? 0
            },

            isSalvageable: Boolean(capitalAsset?.is_salvageable),

            notes: equipment.notes ?? '',

            createdAt: equipment.created_at ?? '',

            updatedAt: equipment.updated_at ?? ''
          }
        }
      }

      /*
       * ---------------------------------------------------------
       * 5. SUPPLY
       * ---------------------------------------------------------
       */

      if (equipmentType === 'supply' || equipmentType === 'supplies') {
        const supply = DatabaseOrm.SelectOne({
          sql: `
          SELECT
            id,
            equipment_id,
            purpose,
            unit_price,
            storage_location

          FROM equipment_supply_assets

          WHERE equipment_id = ?
        `,
          params: [id]
        })

        return {
          success: true,
          message: 'Supply found successfully.',

          data: {
            id: equipment.id,

            name: equipment.title ?? '',

            description: equipment.description ?? '',

            category: equipment.category_name ?? '',

            purpose: supply?.purpose ?? '',

            quantityOnHand: equipment.current_quantity ?? 0,

            unitPrice: supply?.unit_price ?? 0,

            condition: equipment.current_condition ?? 'good',

            components: components.map((component) => ({
              id: component.id,

              name: component.component ?? '',

              purpose: component.purpose ?? '',

              condition: component.current_condition ?? '',

              quantityOnHand: component.quantity_on_hand ?? 0
            })),

            storageLocation: supply?.storage_location ?? '',

            notes: equipment.notes ?? '',

            createdAt: equipment.created_at ?? '',

            updatedAt: equipment.updated_at ?? ''
          }
        }
      }

      /*
       * ---------------------------------------------------------
       * 6. Unknown equipment type
       * ---------------------------------------------------------
       */

      return {
        success: false,
        message: `Unsupported equipment type "${equipment.equipment_type}".`,

        data: null
      }
    })
  }
  static findAll = () => {}
  static delete = () => {}

  static registerIpc = () => {
    this.create()
    this.delete()
    this.update()
    this.findByid()
    this.findAll()

    return {
      success: true,
      message: 'successfully registered EquipmentIpc'
    }
  }
}
