import React, { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  ChevronUp,
  CircleHelp,
  GraduationCap,
  Heart,
  Home,
  Mail,
  MapPin,
  Plus,
  ShieldCheck,
  Trash2,
  User,
  Users,
  Phone,
  Sparkles,
  Church,
  MessageCircle,
  CalendarDays,
  ChevronLeft
} from 'lucide-react'
import { usePeopleContext } from '../../../../hooks/context/people/usePeople'

const STEPS = [
  {
    id: 'personal',
    title: 'About you',
    description: 'Your basic personal information',
    icon: User
  },
  {
    id: 'contact',
    title: 'Contact',
    description: 'How we can reach you',
    icon: Phone
  },
  {
    id: 'address',
    title: 'Where you live',
    description: 'Your residential information',
    icon: Home
  },
  {
    id: 'family',
    title: 'Family',
    description: 'People connected to you',
    icon: Users
  },
  {
    id: 'journey',
    title: 'Your journey',
    description: 'Your spiritual and personal journey',
    icon: Church
  },
  {
    id: 'life',
    title: 'Life & interests',
    description: 'Education, work and hobbies',
    icon: Sparkles
  },
  {
    id: 'review',
    title: 'Review',
    description: 'Make sure everything looks right',
    icon: ShieldCheck
  }
]

const inputClass =
  'w-full rounded-2xl border border-black/[0.08] bg-white px-4 py-3.5 text-[15px] text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black/20 focus:ring-4 focus:ring-black/[0.04]'

const selectClass = `${inputClass} appearance-none pr-10`

const labelClass = 'mb-2 block text-[13px] font-medium tracking-[-0.01em] text-gray-700'

const sectionCardClass =
  'rounded-[28px] border border-black/[0.06] bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] sm:p-7'

const createFamilyMember = () => ({
  id: crypto.randomUUID(),
  familyMemberFullName: '',
  relation: '',
  dateOfBirth: '',
  stageOfDevelopment: '',
  gender: ''
})

const createOccupation = () => ({
  occupation: '',
  specialization: '',
  employer: '',
  workPhone: '',
  workEmergencyPhone: ''
})

const createHobby = () => ({
  hobbyName: '',
  hobbyType: '',
  hobbyEnvironmentPreferences: '',
  isProfessionalSkill: false
})

const FieldError = ({ children }) => {
  if (!children) return null

  return (
    <p className="mt-1.5 flex items-center gap-1 text-xs text-red-600" role="alert">
      <CircleHelp size={13} />
      {children}
    </p>
  )
}

FieldError.propTypes = {
  children: PropTypes.node
}

const Field = ({ label, required = false, error, children, hint }) => (
  <div>
    <label className={labelClass}>
      {label}
      {required && (
        <span className="ml-1 text-red-500" aria-hidden="true">
          *
        </span>
      )}
    </label>

    {children}

    {hint && !error && <p className="mt-1.5 text-xs text-gray-400">{hint}</p>}

    <FieldError>{error}</FieldError>
  </div>
)

Field.propTypes = {
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  error: PropTypes.node,
  children: PropTypes.node,
  hint: PropTypes.node
}

const SectionHeader = ({ icon: Icon, eyebrow, title, description }) => (
  <div className="mb-7">
    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-gray-100">
      <Icon size={20} strokeWidth={1.8} />
    </div>

    {eyebrow && (
      <p className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">
        {eyebrow}
      </p>
    )}

    <h2 className="text-2xl font-semibold tracking-[-0.035em] text-gray-950 sm:text-[28px]">
      {title}
    </h2>

    <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">{description}</p>
  </div>
)

SectionHeader.propTypes = {
  icon: PropTypes.elementType.isRequired,
  eyebrow: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
}

const ReviewRow = ({ label, value }) => (
  <div className="flex items-center justify-between gap-6 py-4">
    <span className="text-sm text-gray-500">{label}</span>

    <span className="max-w-[60%] text-right text-sm font-medium text-gray-900">{value}</span>
  </div>
)

ReviewRow.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.node
}

const MembershipForm = ({ setView }) => {
  const { peopleTemplate, setPeopleTemplate, createPerson } = usePeopleContext()
  console.log('component render')

  /*
   * Keep the form draft local.
   *
   * The previous implementation wrote every keystroke directly into the
   * PeopleContext. If the context provider (or anything above this component)
   * remounts/rebuilds from that update, the focused input is recreated and
   * loses focus after one character.
   *
   * Local state keeps the input mounted and focused while typing. The context
   * is committed when the user changes steps or submits the form.
   */
  const [formData, setFormData] = useState(() => ({
    ...peopleTemplate
  }))

  const [currentStep, setCurrentStep] = useState(0)
  const [errors, setErrors] = useState({})
  const [showOptional, setShowOptional] = useState(false)

  const step = STEPS[currentStep]
  const progress = ((currentStep + 1) / STEPS.length) * 100

  const updateTemplate = (updater) => {
    setFormData((previous) => {
      const next =
        typeof updater === 'function'
          ? updater(previous)
          : {
              ...previous,
              ...updater
            }

      return {
        ...next,
        updatedAt: ''
      }
    })
  }

  const updateField = (field, value) => {
    updateTemplate((previous) => ({
      ...previous,
      [field]: value
    }))

    clearError(field)
  }

  const updateNestedField = (section, field, value) => {
    updateTemplate((previous) => ({
      ...previous,
      [section]: {
        ...previous[section],
        [field]: value
      }
    }))

    clearError(`${section}.${field}`)
  }

  const clearError = (field) => {
    setErrors((previous) => {
      if (!previous[field]) return previous

      const next = { ...previous }
      delete next[field]

      return next
    })
  }

  const validateStep = () => {
    const nextErrors = {}

    if (currentStep === 0) {
      if (!formData.fullName?.trim()) {
        nextErrors.fullName = 'Please enter your full name.'
      }

      if (!formData.gender) {
        nextErrors.gender = 'Please select your gender.'
      }

      if (!formData.dateOfBirth) {
        nextErrors.dateOfBirth = 'Please provide your date of birth.'
      }

      if (!formData.maritalStatus) {
        nextErrors.maritalStatus = 'Please select your marital status.'
      }
    }

    if (currentStep === 1) {
      if (!formData.contactInformation?.preferedContactMethod) {
        nextErrors.preferedContactMethod = 'Choose your preferred contact method.'
      }

      if (!formData.contactInformation?.contactPhoneOrLink?.trim()) {
        nextErrors.contactPhoneOrLink = 'Please provide your preferred contact information.'
      }
    }

    if (currentStep === 2) {
      const address = formData.address || {}

      if (!address.country?.trim()) {
        nextErrors['address.country'] = 'Country is required.'
      }

      if (!address.city?.trim()) {
        nextErrors['address.city'] = 'City is required.'
      }

      if (!address.province?.trim()) {
        nextErrors['address.province'] = 'Province is required.'
      }
    }

    setErrors(nextErrors)

    return Object.keys(nextErrors).length === 0
  }

  const commitDraft = () => {
    setPeopleTemplate((previous) => ({
      ...previous,
      ...formData,
      updatedAt: ''
    }))
  }

  const nextStep = () => {
    if (!validateStep()) return

    commitDraft()

    setCurrentStep((previous) => Math.min(previous + 1, STEPS.length - 1))

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const previousStep = () => {
    commitDraft()

    setCurrentStep((previous) => Math.max(previous - 1, 0))

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const addFamilyMember = () => {
    updateTemplate((previous) => ({
      ...previous,
      family: [...(previous.family || []), createFamilyMember()]
    }))
  }

  const updateFamilyMember = (id, field, value) => {
    updateTemplate((previous) => ({
      ...previous,
      family: (previous.family || []).map((member) =>
        member.id === id
          ? {
              ...member,
              [field]: value
            }
          : member
      )
    }))
  }

  const removeFamilyMember = (id) => {
    updateTemplate((previous) => ({
      ...previous,
      family: (previous.family || []).filter((member) => member.id !== id)
    }))
  }

  /*
   * ------------------------------------------------------------
   * Other contact methods
   * ------------------------------------------------------------
   */

  const addOtherContact = () => {
    updateTemplate((previous) => ({
      ...previous,
      contactInformation: {
        ...previous.contactInformation,
        other: [
          ...(previous.contactInformation?.other || []),
          {
            platform: '',
            contact: ''
          }
        ]
      }
    }))
  }

  const updateOtherContact = (index, field, value) => {
    updateTemplate((previous) => ({
      ...previous,
      contactInformation: {
        ...previous.contactInformation,
        other: (previous.contactInformation?.other || []).map((contact, contactIndex) =>
          contactIndex === index
            ? {
                ...contact,
                [field]: value
              }
            : contact
        )
      }
    }))
  }

  const removeOtherContact = (index) => {
    updateTemplate((previous) => ({
      ...previous,
      contactInformation: {
        ...previous.contactInformation,
        other: (previous.contactInformation?.other || []).filter(
          (_, contactIndex) => contactIndex !== index
        )
      }
    }))
  }

  const addOccupation = () => {
    updateTemplate((previous) => ({
      ...previous,
      additionalInformation: {
        ...previous.additionalInformation,
        occupation: [...(previous.additionalInformation?.occupation || []), createOccupation()]
      }
    }))
  }

  const updateOccupation = (index, field, value) => {
    updateTemplate((previous) => ({
      ...previous,
      additionalInformation: {
        ...previous.additionalInformation,
        occupation: (previous.additionalInformation?.occupation || []).map(
          (occupation, occupationIndex) =>
            occupationIndex === index
              ? {
                  ...occupation,
                  [field]: value
                }
              : occupation
        )
      }
    }))
  }

  const removeOccupation = (index) => {
    updateTemplate((previous) => ({
      ...previous,
      additionalInformation: {
        ...previous.additionalInformation,
        occupation: (previous.additionalInformation?.occupation || []).filter(
          (_, occupationIndex) => occupationIndex !== index
        )
      }
    }))
  }

  const addHobby = () => {
    updateTemplate((previous) => ({
      ...previous,
      additionalInformation: {
        ...previous.additionalInformation,
        hobbies: [...(previous.additionalInformation?.hobbies || []), createHobby()]
      }
    }))
  }

  const updateHobby = (index, field, value) => {
    updateTemplate((previous) => ({
      ...previous,
      additionalInformation: {
        ...previous.additionalInformation,
        hobbies: (previous.additionalInformation?.hobbies || []).map((hobby, hobbyIndex) =>
          hobbyIndex === index
            ? {
                ...hobby,
                [field]: value
              }
            : hobby
        )
      }
    }))
  }

  const removeHobby = (index) => {
    updateTemplate((previous) => ({
      ...previous,
      additionalInformation: {
        ...previous.additionalInformation,
        hobbies: (previous.additionalInformation?.hobbies || []).filter(
          (_, hobbyIndex) => hobbyIndex !== index
        )
      }
    }))
  }

  const summary = useMemo(() => {
    return {
      name: formData.fullName || 'Not provided',
      contact: formData.contactInformation?.contactPhoneOrLink || 'Not provided',
      city: formData.address?.city || 'Not provided',
      family: formData.family?.filter((member) => member.familyMemberFullName).length || 0,
      occupations:
        formData.additionalInformation?.occupation?.filter((occupation) => occupation.occupation)
          .length || 0,
      hobbies:
        formData.additionalInformation?.hobbies?.filter((hobby) => hobby.hobbyName).length || 0
    }
  }, [formData])

  const renderPersonalStep = () => (
    <div className={sectionCardClass}>
      <SectionHeader
        icon={User}
        eyebrow="Step 1"
        title="Let's start with you."
        description="Tell us a little about yourself. Some information can be completed or updated later."
      />

      <div className="space-y-5">
        <Field
          label="Full name"
          required
          error={errors.fullName}
          hint="Use the name you normally use."
        >
          <input
            type="text"
            value={formData.fullName || ''}
            onChange={(event) => updateField('fullName', event.target.value)}
            placeholder="e.g. Thabo Mokoena"
            className={inputClass}
            autoComplete="name"
            aria-required="true"
            aria-invalid={!!errors.fullName}
          />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Date of birth" required error={errors.dateOfBirth}>
            <div className="relative">
              <CalendarDays
                size={18}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="date"
                value={formData.dateOfBirth || ''}
                onChange={(event) => updateField('dateOfBirth', event.target.value)}
                className={`${inputClass} pl-11`}
              />
            </div>
          </Field>

          <Field label="Gender" required error={errors.gender}>
            <div className="relative">
              <select
                value={formData.gender || ''}
                onChange={(event) => updateField('gender', event.target.value)}
                className={selectClass}
              >
                <option value="">Select gender</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>

              <ChevronDown
                size={17}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>
          </Field>
        </div>

        <Field label="Marital status" required error={errors.maritalStatus}>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {['Single', 'Married', 'Divorced', 'Widowed'].map((status) => {
              const active = formData.maritalStatus === status

              return (
                <button
                  key={status}
                  type="button"
                  onClick={() => updateField('maritalStatus', status)}
                  className={`rounded-2xl border px-3 py-3 text-sm font-medium transition ${
                    active
                      ? 'border-black bg-black text-white shadow-sm'
                      : 'border-black/[0.08] bg-white text-gray-600 hover:border-black/20 hover:bg-gray-50'
                  }`}
                  aria-pressed={active}
                >
                  {status}
                </button>
              )
            })}
          </div>
        </Field>

        <button
          type="button"
          onClick={() => setShowOptional(!showOptional)}
          className="flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-gray-900"
          aria-expanded={showOptional}
        >
          {showOptional ? <ChevronUp size={17} /> : <ChevronDown size={17} />}
          Additional personal information
        </button>

        {showOptional && (
          <div className="rounded-2xl bg-gray-50 p-4">
            <Field
              label="Anniversary date"
              hint="Optional — particularly useful for married members."
            >
              <input
                type="date"
                value={formData.anniversaryDate || ''}
                onChange={(event) => updateField('anniversaryDate', event.target.value)}
                className={inputClass}
              />
            </Field>

            <div className="mt-5">
              <Field label="Life stage">
                <div className="relative">
                  <select
                    value={formData.stageOfHumanDevelopment || ''}
                    onChange={(event) => updateField('stageOfHumanDevelopment', event.target.value)}
                    className={selectClass}
                  >
                    <option value="">Select life stage</option>
                    <option value="Child">Child</option>
                    <option value="Teenager">Teenager</option>
                    <option value="Young Adult">Young Adult</option>
                    <option value="Adult">Adult</option>
                    <option value="Senior">Senior</option>
                  </select>

                  <ChevronDown
                    size={17}
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                </div>
              </Field>
            </div>
          </div>
        )}
      </div>
    </div>
  )

  const renderContactStep = () => {
    const contact = formData.contactInformation || {}

    return (
      <div className={sectionCardClass}>
        <SectionHeader
          icon={Phone}
          eyebrow="Step 2"
          title="How should we reach you?"
          description="Choose the contact method you prefer. This helps the church communicate with you in a respectful way."
        />

        <div className="space-y-6">
          <Field label="Preferred contact method" required error={errors.preferedContactMethod}>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                {
                  value: 'phone',
                  title: 'Phone',
                  icon: Phone
                },
                {
                  value: 'email',
                  title: 'Email',
                  icon: Mail
                },
                {
                  value: 'sms',
                  title: 'SMS',
                  icon: MessageCircle
                }
              ].map(({ value, title, icon: Icon }) => {
                const active = contact.preferedContactMethod === value

                return (
                  <button
                    type="button"
                    key={value}
                    onClick={() =>
                      updateNestedField('contactInformation', 'preferedContactMethod', value)
                    }
                    className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition ${
                      active
                        ? 'border-black bg-black text-white'
                        : 'border-black/[0.08] hover:border-black/20 hover:bg-gray-50'
                    }`}
                    aria-pressed={active}
                  >
                    <Icon size={19} />

                    <div>
                      <p className="text-sm font-medium">{title}</p>
                      <p className={`mt-0.5 text-xs ${active ? 'text-white/60' : 'text-gray-400'}`}>
                        {value === 'phone' ? 'Call me' : value === 'email' ? 'Email me' : 'Text me'}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>
          </Field>

          <Field
            label={contact.preferedContactMethod === 'email' ? 'Email address' : 'Contact number'}
            required
            error={errors.contactPhoneOrLink}
          >
            <input
              type={contact.preferedContactMethod === 'email' ? 'email' : 'tel'}
              value={contact.contactPhoneOrLink || ''}
              onChange={(event) =>
                updateNestedField('contactInformation', 'contactPhoneOrLink', event.target.value)
              }
              placeholder={
                contact.preferedContactMethod === 'email' ? 'you@example.com' : '+27 82 123 4567'
              }
              className={inputClass}
              autoComplete={contact.preferedContactMethod === 'email' ? 'email' : 'tel'}
            />
          </Field>

          <div className="border-t border-black/[0.06] pt-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Other ways to connect</h3>
                <p className="mt-1 text-xs text-gray-400">Optional social or messaging accounts.</p>
              </div>

              <button
                type="button"
                onClick={addOtherContact}
                className="flex items-center gap-1.5 rounded-full border border-black/[0.08] px-3 py-2 text-xs font-medium transition hover:bg-gray-50"
              >
                <Plus size={14} />
                Add
              </button>
            </div>

            <div className="space-y-3">
              {(contact.other || []).map((item, index) => (
                <div key={index} className="flex gap-3">
                  <input
                    value={item.platform || ''}
                    onChange={(event) => updateOtherContact(index, 'platform', event.target.value)}
                    placeholder="WhatsApp"
                    className={inputClass + 'grow'}
                  />

                  <input
                    value={item.contact || ''}
                    onChange={(event) => updateOtherContact(index, 'contact', event.target.value)}
                    placeholder="Username or number"
                    className={inputClass + 'grow'}
                  />

                  <button
                    type="button"
                    onClick={() => removeOtherContact(index)}
                    className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-2xl border border-black/[0.08] text-gray-400 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500"
                    aria-label="Remove contact method"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderAddressStep = () => {
    const address = formData.address || {}

    return (
      <div className={sectionCardClass}>
        <SectionHeader
          icon={MapPin}
          eyebrow="Step 3"
          title="Where do you live?"
          description="Your residential information helps us maintain accurate membership records and understand our community."
        />

        <div className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Country" required error={errors['address.country']}>
              <input
                value={address.country || ''}
                onChange={(event) => updateNestedField('address', 'country', event.target.value)}
                placeholder="South Africa"
                className={inputClass}
                autoComplete="country-name"
              />
            </Field>

            <Field label="Province" required error={errors['address.province']}>
              <input
                value={address.province || ''}
                onChange={(event) => updateNestedField('address', 'province', event.target.value)}
                placeholder="Gauteng"
                className={inputClass}
                autoComplete="address-level1"
              />
            </Field>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="City" required error={errors['address.city']}>
              <input
                value={address.city || ''}
                onChange={(event) => updateNestedField('address', 'city', event.target.value)}
                placeholder="Johannesburg"
                className={inputClass}
                autoComplete="address-level2"
              />
            </Field>

            <Field label="Area">
              <input
                value={address.area || ''}
                onChange={(event) => updateNestedField('address', 'area', event.target.value)}
                placeholder="Sandton"
                className={inputClass}
              />
            </Field>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Street name">
              <input
                value={address.streetName || ''}
                onChange={(event) => updateNestedField('address', 'streetName', event.target.value)}
                placeholder="Main Street"
                className={inputClass}
                autoComplete="street-address"
              />
            </Field>

            <Field label="House number">
              <input
                value={address.houseNumber || ''}
                onChange={(event) =>
                  updateNestedField('address', 'houseNumber', event.target.value)
                }
                placeholder="42"
                className={inputClass}
              />
            </Field>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Postal code">
              <input
                value={address.code || ''}
                onChange={(event) => updateNestedField('address', 'code', event.target.value)}
                placeholder="2196"
                className={inputClass}
                autoComplete="postal-code"
              />
            </Field>

            <Field label="House type">
              <div className="relative">
                <select
                  value={address.houseType || ''}
                  onChange={(event) =>
                    updateNestedField('address', 'houseType', event.target.value)
                  }
                  className={selectClass}
                >
                  <option value="">Select house type</option>
                  <option value="House">House</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Townhouse">Townhouse</option>
                  <option value="Complex">Complex</option>
                  <option value="Other">Other</option>
                </select>

                <ChevronDown
                  size={17}
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </div>
            </Field>
          </div>
        </div>
      </div>
    )
  }

  const renderFamilyStep = () => {
    const family = formData.family || []

    return (
      <div className={sectionCardClass}>
        <SectionHeader
          icon={Users}
          eyebrow="Step 4"
          title="Who is part of your family?"
          description="You can add immediate family members now or come back and complete this later."
        />

        <div className="space-y-4">
          {family.length === 0 && (
            <div className="rounded-2xl bg-gray-50 p-6 text-center">
              <Users size={24} className="mx-auto mb-3 text-gray-400" />

              <p className="text-sm font-medium text-gray-700">No family members added</p>

              <p className="mt-1 text-xs text-gray-400">This section is completely optional.</p>
            </div>
          )}

          {family.map((member, index) => (
            <div
              key={member.id}
              className="rounded-[22px] border border-black/[0.07] bg-gray-50/70 p-4 sm:p-5"
            >
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-semibold text-gray-800">Family member {index + 1}</p>

                <button
                  type="button"
                  onClick={() => removeFamilyMember(member.id)}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition hover:bg-red-50 hover:text-red-500"
                  aria-label={`Remove family member ${index + 1}`}
                >
                  <Trash2 size={15} />
                </button>
              </div>

              <div className="space-y-4">
                <Field label="Full name">
                  <input
                    value={member.familyMemberFullName || ''}
                    onChange={(event) =>
                      updateFamilyMember(member.id, 'familyMemberFullName', event.target.value)
                    }
                    placeholder="Family member's name"
                    className={inputClass}
                  />
                </Field>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Relationship">
                    <div className="relative">
                      <select
                        value={member.relation || ''}
                        onChange={(event) =>
                          updateFamilyMember(member.id, 'relation', event.target.value)
                        }
                        className={selectClass}
                      >
                        <option value="">Select relationship</option>
                        <option value="spouse">Spouse</option>
                        <option value="child">Child</option>
                        <option value="parent">Parent</option>
                        <option value="sibling">Sibling</option>
                        <option value="grandparent">Grandparent</option>
                        <option value="grandchild">Grandchild</option>
                        <option value="other">Other</option>
                      </select>

                      <ChevronDown
                        size={17}
                        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                      />
                    </div>
                  </Field>

                  <Field label="Date of birth">
                    <input
                      type="date"
                      value={member.dateOfBirth || ''}
                      onChange={(event) =>
                        updateFamilyMember(member.id, 'dateOfBirth', event.target.value)
                      }
                      className={inputClass}
                    />
                  </Field>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Gender">
                    <div className="relative">
                      <select
                        value={member.gender || ''}
                        onChange={(event) =>
                          updateFamilyMember(member.id, 'gender', event.target.value)
                        }
                        className={selectClass}
                      >
                        <option value="">Select gender</option>
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                        <option value="Other">Other</option>
                      </select>

                      <ChevronDown
                        size={17}
                        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                      />
                    </div>
                  </Field>

                  <Field label="Life stage">
                    <div className="relative">
                      <select
                        value={member.stageOfDevelopment || ''}
                        onChange={(event) =>
                          updateFamilyMember(member.id, 'stageOfDevelopment', event.target.value)
                        }
                        className={selectClass}
                      >
                        <option value="">Select life stage</option>
                        <option value="Child">Child</option>
                        <option value="Teenager">Teenager</option>
                        <option value="Young Adult">Young Adult</option>
                        <option value="Adult">Adult</option>
                        <option value="Senior">Senior</option>
                      </select>

                      <ChevronDown
                        size={17}
                        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                      />
                    </div>
                  </Field>
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addFamilyMember}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-black/10 py-4 text-sm font-medium text-gray-600 transition hover:border-black/20 hover:bg-gray-50"
          >
            <Plus size={17} />
            Add family member
          </button>
        </div>
      </div>
    )
  }

  const renderJourneyStep = () => {
    const spiritualJourney = formData.additionalInformation?.spiritualJourney || {}

    return (
      <div className={sectionCardClass}>
        <SectionHeader
          icon={Church}
          eyebrow="Step 5"
          title="Tell us about your journey."
          description="There is no right or wrong answer here. This simply helps us understand where you are and how we can serve you."
        />

        <div className="space-y-6">
          <Field label="Where would you describe yourself today?">
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                {
                  value: 'seeker',
                  title: 'Exploring',
                  description: 'I am still learning and discovering.'
                },
                {
                  value: 'new believer',
                  title: 'New believer',
                  description: 'I have recently begun following Christ.'
                },
                {
                  value: 'growing',
                  title: 'Growing',
                  description: 'I am actively growing in my faith.'
                },
                {
                  value: 'mature',
                  title: 'Mature',
                  description: 'I have been walking in faith for some time.'
                }
              ].map((item) => {
                const active = spiritualJourney.spiritualStatus === item.value

                return (
                  <button
                    type="button"
                    key={item.value}
                    onClick={() =>
                      updateTemplate((previous) => ({
                        ...previous,
                        additionalInformation: {
                          ...previous.additionalInformation,
                          spiritualJourney: {
                            ...previous.additionalInformation?.spiritualJourney,
                            spiritualStatus: item.value
                          }
                        }
                      }))
                    }
                    className={`rounded-2xl border p-4 text-left transition ${
                      active
                        ? 'border-black bg-black text-white'
                        : 'border-black/[0.08] hover:border-black/20 hover:bg-gray-50'
                    }`}
                    aria-pressed={active}
                  >
                    <p className="text-sm font-semibold">{item.title}</p>

                    <p
                      className={`mt-1 text-xs leading-5 ${
                        active ? 'text-white/60' : 'text-gray-400'
                      }`}
                    >
                      {item.description}
                    </p>
                  </button>
                )
              })}
            </div>
          </Field>

          <Field label="What brought you to the church?" hint="A short answer is perfectly fine.">
            <textarea
              value={spiritualJourney.reason || ''}
              onChange={(event) =>
                updateTemplate((previous) => ({
                  ...previous,
                  additionalInformation: {
                    ...previous.additionalInformation,
                    spiritualJourney: {
                      ...previous.additionalInformation?.spiritualJourney,
                      reason: event.target.value
                    }
                  }
                }))
              }
              placeholder="Tell us what brought you here..."
              rows={4}
              className={`${inputClass} resize-none`}
            />
          </Field>
        </div>
      </div>
    )
  }

  const renderLifeStep = () => {
    const additional = formData.additionalInformation || {}

    return (
      <div className="space-y-5">
        <div className={sectionCardClass}>
          <SectionHeader
            icon={GraduationCap}
            eyebrow="Education"
            title="Your education"
            description="Optional information that helps us understand your background."
          />

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="School or institution">
              <input
                value={additional.school?.schoolName || ''}
                onChange={(event) =>
                  updateTemplate((previous) => ({
                    ...previous,
                    additionalInformation: {
                      ...previous.additionalInformation,
                      school: {
                        ...previous.additionalInformation?.school,
                        schoolName: event.target.value
                      }
                    }
                  }))
                }
                placeholder="School or institution"
                className={inputClass}
              />
            </Field>

            <Field label="Education level">
              <div className="relative">
                <select
                  value={additional.school?.educationLevel || ''}
                  onChange={(event) =>
                    updateTemplate((previous) => ({
                      ...previous,
                      additionalInformation: {
                        ...previous.additionalInformation,
                        school: {
                          ...previous.additionalInformation?.school,
                          educationLevel: event.target.value
                        }
                      }
                    }))
                  }
                  className={selectClass}
                >
                  <option value="">Select level</option>
                  <option value="Primary">Primary</option>
                  <option value="High School">High School</option>
                  <option value="College">College</option>
                  <option value="Diploma">Diploma</option>
                  <option value="Degree">Degree</option>
                  <option value="Postgraduate">Postgraduate</option>
                  <option value="Other">Other</option>
                </select>

                <ChevronDown
                  size={17}
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </div>
            </Field>
          </div>
        </div>

        <div className={sectionCardClass}>
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-gray-100">
                <BriefcaseBusiness size={20} strokeWidth={1.8} />
              </div>

              <h2 className="text-2xl font-semibold tracking-[-0.035em] text-gray-950">
                Your work
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Add your current occupation or professional experience.
              </p>
            </div>

            <button
              type="button"
              onClick={addOccupation}
              className="flex shrink-0 items-center gap-1.5 rounded-full border border-black/[0.08] px-3 py-2 text-xs font-medium transition hover:bg-gray-50"
            >
              <Plus size={14} />
              Add
            </button>
          </div>

          <div className="space-y-4">
            {(additional.occupation || []).map((occupation, index) => (
              <div
                key={index}
                className="rounded-[22px] border border-black/[0.07] bg-gray-50/70 p-4"
              >
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm font-semibold">Occupation {index + 1}</p>

                  <button
                    type="button"
                    onClick={() => removeOccupation(index)}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-red-50 hover:text-red-500"
                    aria-label={`Remove occupation ${index + 1}`}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Occupation">
                      <input
                        value={occupation.occupation || ''}
                        onChange={(event) =>
                          updateOccupation(index, 'occupation', event.target.value)
                        }
                        placeholder="Software Developer"
                        className={inputClass}
                      />
                    </Field>

                    <Field label="Specialization">
                      <input
                        value={occupation.specialization || ''}
                        onChange={(event) =>
                          updateOccupation(index, 'specialization', event.target.value)
                        }
                        placeholder="Frontend development"
                        className={inputClass}
                      />
                    </Field>
                  </div>

                  <Field label="Employer">
                    <input
                      value={occupation.employer || ''}
                      onChange={(event) => updateOccupation(index, 'employer', event.target.value)}
                      placeholder="Company or organisation"
                      className={inputClass}
                    />
                  </Field>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Work phone">
                      <input
                        value={occupation.workPhone || ''}
                        onChange={(event) =>
                          updateOccupation(index, 'workPhone', event.target.value)
                        }
                        placeholder="+27 11 123 4567"
                        className={inputClass}
                      />
                    </Field>

                    <Field label="Work emergency phone">
                      <input
                        value={occupation.workEmergencyPhone || ''}
                        onChange={(event) =>
                          updateOccupation(index, 'workEmergencyPhone', event.target.value)
                        }
                        placeholder="Emergency contact"
                        className={inputClass}
                      />
                    </Field>
                  </div>
                </div>
              </div>
            ))}

            {(additional.occupation || []).length === 0 && (
              <div className="rounded-2xl bg-gray-50 p-6 text-center">
                <BriefcaseBusiness size={23} className="mx-auto mb-3 text-gray-400" />

                <p className="text-sm font-medium text-gray-700">No occupations added</p>

                <p className="mt-1 text-xs text-gray-400">This information can be added later.</p>
              </div>
            )}

            <button
              type="button"
              onClick={addOccupation}
              className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-black/10 py-4 text-sm font-medium text-gray-600 hover:bg-gray-50"
            >
              <Plus size={17} />
              Add occupation
            </button>
          </div>
        </div>

        <div className={sectionCardClass}>
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-gray-100">
                <Heart size={20} strokeWidth={1.8} />
              </div>

              <h2 className="text-2xl font-semibold tracking-[-0.035em] text-gray-950">
                Things you enjoy
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Your hobbies and interests can help us build meaningful community.
              </p>
            </div>

            <button
              type="button"
              onClick={addHobby}
              className="flex shrink-0 items-center gap-1.5 rounded-full border border-black/[0.08] px-3 py-2 text-xs font-medium transition hover:bg-gray-50"
            >
              <Plus size={14} />
              Add
            </button>
          </div>

          <div className="space-y-3">
            {(additional.hobbies || []).map((hobby, index) => (
              <div
                key={index}
                className="rounded-[22px] border border-black/[0.07] bg-gray-50/70 p-4"
              >
                <div className="flex gap-3">
                  <div className="flex-1 space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Hobby">
                        <input
                          value={hobby.hobbyName || ''}
                          onChange={(event) => updateHobby(index, 'hobbyName', event.target.value)}
                          placeholder="Photography"
                          className={inputClass}
                        />
                      </Field>

                      <Field label="Type">
                        <input
                          value={hobby.hobbyType || ''}
                          onChange={(event) => updateHobby(index, 'hobbyType', event.target.value)}
                          placeholder="Creative"
                          className={inputClass}
                        />
                      </Field>
                    </div>

                    <Field label="Preferred environment">
                      <input
                        value={hobby.hobbyEnvironmentPreferences || ''}
                        onChange={(event) =>
                          updateHobby(index, 'hobbyEnvironmentPreferences', event.target.value)
                        }
                        placeholder="Outdoors, groups, quiet spaces..."
                        className={inputClass}
                      />
                    </Field>

                    <label className="flex cursor-pointer items-center gap-3">
                      <input
                        type="checkbox"
                        checked={hobby.isProfessionalSkill || false}
                        onChange={(event) =>
                          updateHobby(index, 'isProfessionalSkill', event.target.checked)
                        }
                        className="h-4 w-4 rounded border-gray-300"
                      />

                      <span className="text-sm text-gray-600">
                        This is also a professional skill
                      </span>
                    </label>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeHobby(index)}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-gray-400 hover:bg-red-50 hover:text-red-500"
                    aria-label={`Remove hobby ${index + 1}`}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addHobby}
              className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-black/10 py-4 text-sm font-medium text-gray-600 hover:bg-gray-50"
            >
              <Plus size={17} />
              Add hobby
            </button>
          </div>
        </div>
      </div>
    )
  }

  const renderReviewStep = () => (
    <div className="space-y-5">
      <div className={sectionCardClass}>
        <SectionHeader
          icon={ShieldCheck}
          eyebrow="Final step"
          title="Everything looks good?"
          description="Review your information before completing your membership profile."
        />

        <div className="divide-y divide-black/[0.06]">
          <ReviewRow label="Full name" value={summary.name} />

          <ReviewRow label="Preferred contact" value={summary.contact} />

          <ReviewRow label="Location" value={summary.city} />

          <ReviewRow label="Family members" value={`${summary.family}`} />

          <ReviewRow label="Occupations" value={`${summary.occupations}`} />

          <ReviewRow label="Hobbies" value={`${summary.hobbies}`} />
        </div>
      </div>

      <div className="rounded-[28px] border border-black/[0.06] bg-gray-50 p-5 sm:p-6">
        <div className="flex gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
            <ShieldCheck size={19} />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900">Your information matters.</h3>

            <p className="mt-1.5 text-sm leading-6 text-gray-500">
              Your information will be used to maintain your church membership record and help the
              church serve and communicate with you.
            </p>
          </div>
        </div>
      </div>
    </div>
  )

  const renderStep = () => {
    switch (step.id) {
      case 'personal':
        return renderPersonalStep()

      case 'contact':
        return renderContactStep()

      case 'address':
        return renderAddressStep()

      case 'family':
        return renderFamilyStep()

      case 'journey':
        return renderJourneyStep()

      case 'life':
        return renderLifeStep()

      case 'review':
        return renderReviewStep()

      default:
        return null
    }
  }

  /*
   * ------------------------------------------------------------
   * Submit
   * ------------------------------------------------------------
   */

  const handleSubmit = async () => {
    if (!validateStep()) return

    const finalProfile = {
      ...formData,
      updatedAt: ''
    }

    console.log(finalProfile)

    const result = await createPerson(finalProfile, 'member')

    if (!result) {
      alert('Person not created')
    }

    console.log(result)

    /*
     * Connect your persistence layer here:
     *
     * await window.api.people.create(finalProfile)
     *
     * or:
     *
     * await PeopleAPI.create(finalProfile)
     */

    alert('Member saved')
  }

  return (
    <section className="min-h-screen bg-[#f5f5f7]">
      <div className="p-6">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex gap-2 items-center">
                <button
                  type="button"
                  onClick={() => {
                    commitDraft()
                    setView('people')
                  }}
                  className="px-4 text-sm rounded-lg bg-white border border-stone-300 items-center justify-center flex"
                >
                  <ChevronLeft size={16} />
                  Go back
                </button>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">
                  Membership
                </p>
              </div>

              <h1 className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-gray-950 sm:text-3xl">
                Create your profile
              </h1>
            </div>

            <div className="hidden rounded-full border border-black/[0.06] bg-white px-3 py-1.5 text-xs font-medium text-gray-500 sm:block">
              {currentStep + 1} of {STEPS.length}
            </div>
          </div>

          {/* Progress */}
          <div className="mt-6 h-1 overflow-hidden rounded-full bg-black/[0.06]">
            <div
              className="h-full rounded-full bg-black transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </header>

        <div className="grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)]">
          {/* Desktop navigation */}
          <aside className="hidden lg:block">
            <nav aria-label="Membership form progress" className="sticky top-8">
              <div className="space-y-1">
                {STEPS.map((item, index) => {
                  const Icon = item.icon
                  const active = index === currentStep
                  const complete = index < currentStep

                  return (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => {
                        if (index < currentStep) {
                          setCurrentStep(index)
                        }
                      }}
                      disabled={index > currentStep}
                      className={`flex w-full items-center gap-3 rounded-2xl p-3 text-left transition ${
                        active
                          ? 'bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)]'
                          : complete
                            ? 'hover:bg-white/70'
                            : 'opacity-40'
                      }`}
                    >
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                          active
                            ? 'bg-black text-white'
                            : complete
                              ? 'bg-gray-200 text-gray-700'
                              : 'bg-gray-100 text-gray-400'
                        }`}
                      >
                        {complete ? <Check size={16} /> : <Icon size={16} />}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-gray-900">{item.title}</p>

                        <p className="mt-0.5 truncate text-[11px] text-gray-400">
                          {item.description}
                        </p>
                      </div>
                    </button>
                  )
                })}
              </div>
            </nav>
          </aside>

          {/* Main content */}
          <section>
            {/* Mobile step indicator */}
            <div className="mb-5 flex items-center justify-between rounded-2xl border border-black/[0.05] bg-white px-4 py-3 lg:hidden">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-black text-white">
                  {React.createElement(step.icon, {
                    size: 17
                  })}
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-900">{step.title}</p>

                  <p className="text-xs text-gray-400">{step.description}</p>
                </div>
              </div>

              <span className="text-xs font-medium text-gray-400">
                {currentStep + 1}/{STEPS.length}
              </span>
            </div>

            {renderStep()}

            {/* Navigation */}
            <div className="mt-6 flex items-center justify-between">
              <button
                type="button"
                onClick={previousStep}
                disabled={currentStep === 0}
                className={`flex items-center gap-2 rounded-full px-4 py-3 text-sm font-medium transition ${
                  currentStep === 0
                    ? 'pointer-events-none opacity-0'
                    : 'text-gray-500 hover:bg-white hover:text-gray-900'
                }`}
              >
                <ArrowLeft size={17} />
                Back
              </button>

              {currentStep < STEPS.length - 1 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-medium text-white shadow-[0_5px_20px_rgba(0,0,0,0.15)] transition hover:bg-gray-800 active:scale-[0.98]"
                >
                  Continue
                  <ArrowRight size={17} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="flex items-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-medium text-white shadow-[0_5px_20px_rgba(0,0,0,0.15)] transition hover:bg-gray-800 active:scale-[0.98]"
                >
                  <Check size={17} />
                  Complete membership
                </button>
              )}
            </div>
          </section>
        </div>
      </div>
    </section>
  )
}

MembershipForm.propTypes = {
  setView: PropTypes.func.isRequired
}

export default MembershipForm
