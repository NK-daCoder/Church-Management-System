import React, { useMemo, useState } from 'react'
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  FaceGrinning,
  Mail,
  MapPin,
  Phone,
  Star,
  User,
  Users
} from 'lucide-react'

import { usePeopleContext } from '../../../../hooks/context/people/usePeople'
import { peopleProfileTemplate } from '../../../../constants/template/people/profile/people.creation'

const steps = [
  {
    id: 'personal',
    title: 'About you',
    description: 'Tell us a little about yourself.',
    icon: User
  },
  {
    id: 'contact',
    title: 'Contact',
    description: 'How can we reach you?',
    icon: Phone
  },
  {
    id: 'visit',
    title: 'Your visit',
    description: 'Help us understand your visit.',
    icon: Users
  },
  {
    id: 'impressions',
    title: 'Impressions',
    description: 'Tell us your first impressions',
    icon: FaceGrinning
  },
  {
    id: 'expectations',
    title: 'Expectations',
    description: 'visitor expectation',
    icon: Star
  },
  {
    id: 'address',
    title: 'Address',
    description: 'Optional location information.',
    icon: MapPin
  },
  {
    id: 'preview',
    title: 'Preview Visitor',
    description: 'Validation',
    icon: User
  }
]

const inputClass =
  'w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-[14px] text-neutral-900 outline-none transition-all placeholder:text-neutral-400 focus:border-neutral-900 focus:bg-white focus:ring-4 focus:ring-neutral-900/5'

const labelClass = 'mb-2 block text-[12px] font-medium tracking-wide text-neutral-600'

const VisitorForm = ({ setView }) => {
  const { peopleTemplate: visitor, setPeopleTemplate: setVisitor } = usePeopleContext()
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  // just for rendering and styling button
  const [isFirstTimeVisitor, setIsFirstTimeVisitor] = useState(null)

  const step = steps[currentStep]

  const updateField = (path, value) => {
    setVisitor((previous) => {
      const next = structuredClone(previous)
      let target = next
      for (let i = 0; i < path.length - 1; i++) {
        target = target[path[i]]
      }

      target[path[path.length - 1]] = value

      return next
    })
  }

  const canContinue = useMemo(() => {
    if (currentStep === 0) {
      return visitor.fullName.trim().length > 0
    }

    if (currentStep === 1) {
      return (
        visitor.contactInformation.contactPhoneOrLink.trim().length > 0 &&
        visitor.contactInformation.preferedContactMethod.length > 0
      )
    }

    return true
  }, [currentStep, visitor])

  const nextStep = () => {
    if (!canContinue) return

    if (currentStep < steps.length - 1) {
      console.log(`${currentStep} < ${steps.length - 1}`)
      console.log(steps.length)
      setCurrentStep((step) => step + 1)
    }
  }

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep((step) => step - 1)
    }
  }

  const handleCheckbox = (key, value, isChecked) => {
    setVisitor((prevData) => {
      // 1. Get the current array for this key, or initialize an empty one
      const currentArray = prevData[key] || []

      // 2. Add or remove the value based on the checkbox state
      const updatedArray = isChecked
        ? [...currentArray, value] // Add item
        : currentArray.filter((item) => item !== value) // Remove item

      // 3. Return updated state
      return {
        ...prevData,
        [key]: updatedArray
      }
    })
  }

  const submitVisitor = async (event) => {
    event.preventDefault()

    setIsSubmitting(true)

    try {
      console.log(visitor)
      setVisitor(peopleProfileTemplate)
      setCurrentStep(0)

      // if (onSubmit) {
      //   await onSubmit(visitor)
      // }

      // setVisitor(peopleProfileTemplate)

      // setView('people')
    } catch (error) {
      console.error('Failed to create visitor:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="min-h-full bg-[#f5f5f7] p-4">
      <div>
        {/* Header */}
        <header className="mb-6 flex items-center justify-between">
          <button
            onClick={() => setView('people')}
            type="button"
            className="group flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-[13px] font-medium text-neutral-600 transition-colors hover:bg-white hover:text-neutral-900"
          >
            <ChevronLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
            Back
          </button>

          <div className="text-right">
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-neutral-400">
              People
            </p>

            <h1 className="text-lg font-semibold tracking-tight text-neutral-950">New Visitor</h1>
          </div>
        </header>

        <div className="overflow-hidden rounded-3xl border border-neutral-200/70 bg-white shadow-[0_8px_40px_rgba(0,0,0,0.05)]">
          {/* Progress */}
          <div className="border-b border-neutral-100 px-6 py-5 md:px-8">
            <div className="flex items-center gap-3">
              {steps.map((item, index) => {
                const Icon = item.icon
                const active = index === currentStep
                const completed = index < currentStep

                return (
                  <React.Fragment key={item.id}>
                    <div
                      className={`flex min-w-0 items-center gap-2 ${
                        active
                          ? 'text-neutral-950'
                          : completed
                            ? 'text-neutral-600'
                            : 'text-neutral-300'
                      }`}
                    >
                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all ${
                          completed
                            ? 'bg-neutral-900 text-white'
                            : active
                              ? 'bg-neutral-900 text-white'
                              : 'bg-neutral-100 text-neutral-400'
                        }`}
                      >
                        {completed ? <Check size={14} strokeWidth={2.5} /> : <Icon size={14} />}
                      </div>

                      <div className="hidden sm:block">
                        <p className="text-[12px] font-semibold">{item.title}</p>

                        {active && (
                          <p className="mt-0.5 text-[10px] text-neutral-400">{item.description}</p>
                        )}
                      </div>
                    </div>

                    {index !== steps.length - 1 && <div className="h-px flex-1 bg-neutral-100" />}
                  </React.Fragment>
                )
              })}
            </div>
          </div>

          {/* Form */}
          <form>
            <div className="min-h-[500px] px-6 py-8 md:px-12 md:py-10">
              {/* --------------------------------
                  STEP 1 — PERSONAL
              -------------------------------- */}
              {currentStep === 0 && (
                <div className="mx-auto max-w-2xl">
                  <div className="mb-8">
                    <span className="mb-3 inline-flex rounded-full bg-neutral-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-500">
                      Step 01
                    </span>

                    <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">
                      Welcome.
                    </h2>

                    <p className="mt-2 max-w-lg text-sm leading-6 text-neutral-500">
                      We only need a few details to create your visitor profile. You can provide
                      additional information later.
                    </p>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <label className={labelClass}>
                        Full name <span className="text-neutral-400">*</span>
                      </label>

                      <input
                        type="text"
                        value={visitor.fullName}
                        onChange={(event) => updateField(['fullName'], event.target.value)}
                        placeholder="e.g. Thabo Mokoena"
                        className={inputClass}
                        autoFocus
                      />
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className={labelClass}>Date of birth</label>

                        <input
                          type="date"
                          value={visitor.dateOfBirth}
                          onChange={(event) => updateField(['dateOfBirth'], event.target.value)}
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label className={labelClass}>Gender</label>

                        <select
                          value={visitor.gender}
                          onChange={(event) => updateField(['gender'], event.target.value)}
                          className={inputClass}
                        >
                          <option value="">Prefer not to say</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className={labelClass}>Marital status</label>

                      <select
                        value={visitor.maritalStatus}
                        onChange={(event) => updateField(['maritalStatus'], event.target.value)}
                        className={inputClass}
                      >
                        <option value="">Prefer not to say</option>
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                        <option value="Engaged">Engaged</option>
                        <option value="Divorced">Divorced</option>
                        <option value="Widowed">Widowed</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* --------------------------------
                  STEP 2 — CONTACT
              -------------------------------- */}
              {currentStep === 1 && (
                <div className="mx-auto max-w-2xl">
                  <div className="mb-8">
                    <span className="mb-3 inline-flex rounded-full bg-neutral-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-500">
                      Step 02
                    </span>

                    <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">
                      Stay connected.
                    </h2>

                    <p className="mt-2 max-w-lg text-sm leading-6 text-neutral-500">
                      Choose how the church should contact you. This can be changed later.
                    </p>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <label className={labelClass}>
                        Preferred contact method <span className="text-neutral-400">*</span>
                      </label>

                      <div className="grid grid-cols-3 gap-3">
                        {[
                          {
                            value: 'phone',
                            label: 'Phone',
                            icon: Phone
                          },
                          {
                            value: 'email',
                            label: 'Email',
                            icon: Mail
                          },
                          {
                            value: 'sms',
                            label: 'SMS',
                            icon: Phone
                          }
                        ].map((method) => {
                          const Icon = method.icon
                          const selected =
                            visitor.contactInformation.preferedContactMethod === method.value

                          return (
                            <button
                              key={method.value}
                              type="button"
                              onClick={() =>
                                updateField(
                                  ['contactInformation', 'preferedContactMethod'],
                                  method.value
                                )
                              }
                              className={`flex flex-col items-center gap-2 rounded-2xl border px-3 py-4 transition-all ${
                                selected
                                  ? 'border-neutral-900 bg-neutral-900 text-white shadow-lg'
                                  : 'border-neutral-200 bg-white text-neutral-500 hover:border-neutral-300 hover:bg-neutral-50'
                              }`}
                            >
                              <Icon size={17} />

                              <span className="text-[11px] font-medium">{method.label}</span>
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    <div>
                      <label className={labelClass}>
                        Contact details <span className="text-neutral-400">*</span>
                      </label>

                      <input
                        type={
                          visitor.contactInformation.preferedContactMethod === 'email'
                            ? 'email'
                            : 'text'
                        }
                        value={visitor.contactInformation.contactPhoneOrLink}
                        onChange={(event) =>
                          updateField(
                            ['contactInformation', 'contactPhoneOrLink'],
                            event.target.value
                          )
                        }
                        placeholder={
                          visitor.contactInformation.preferedContactMethod === 'email'
                            ? 'name@example.com'
                            : '+27 82 123 4567'
                        }
                        className={inputClass}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* --------------------------------
                  STEP 3 — VISIT
              -------------------------------- */}
              {currentStep === 2 && (
                <div className="mx-auto max-w-2xl">
                  <div className="mb-8">
                    <span className="mb-3 inline-flex rounded-full bg-neutral-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-500">
                      Step 03
                    </span>

                    <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">
                      Tell us about your visit.
                    </h2>

                    <p className="mt-2 max-w-lg text-sm leading-6 text-neutral-500">
                      These details help your church team understand how to follow up with you.
                    </p>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <label className={labelClass}>Is this your first visit?</label>

                      <div className="grid grid-cols-2 gap-3">
                        {['Yes', 'No'].map((value) => (
                          <button
                            key={value}
                            type="button"
                            className={`${isFirstTimeVisitor === value ? 'bg-stone-900 text-white hover:opacity-90' : 'bg-white hover:border-neutral-400 hover:bg-neutral-50'} rounded-2xl border border-neutral-200 px-4 py-4 text-left transition-all`}
                            onClick={() => {
                              setIsFirstTimeVisitor(value)
                              console.log(isFirstTimeVisitor)
                              setVisitor((prev) => ({
                                ...prev,
                                isFirstTimer: value
                              }))
                            }}
                          >
                            <p className="text-sm font-semibold">{value}</p>

                            <p className="mt-1 text-[11px]">
                              {value === 'Yes'
                                ? 'Welcome to the family.'
                                : 'Great to have you back.'}
                            </p>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className={labelClass}>How did you hear about us?</label>

                      <select className={inputClass}>
                        <option value="">Select an option</option>
                        <option value="friend">Friend or family</option>
                        <option value="social-media">Social media</option>
                        <option value="website">Church website</option>
                        <option value="event">Church event</option>
                        <option value="search">Online search</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className={labelClass}>Anything {"you'd"} like us to know?</label>

                      <textarea
                        rows={4}
                        placeholder="Optional"
                        className={`${inputClass} resize-none`}
                        onChange={(e) =>
                          setVisitor((prev) => ({
                            ...prev,
                            notes: e.target.value
                          }))
                        }
                      />
                    </div>
                  </div>
                </div>
              )}
              {/* --------------------------------
                  STEP 4 - IMPRESSIONS
                  ---------------------------------
                */}
              {currentStep === 3 && (
                <div className="mx-auto max-w-2xl">
                  <div className="mb-8">
                    <span className="mb-3 inline-flex rounded-full bg-neutral-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-500">
                      Step 04
                    </span>

                    <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">
                      Impressions
                    </h2>

                    <p className="mt-2 max-w-lg text-sm leading-6 text-neutral-500">
                      These details help your church team understand what is the first time
                      impression of the visitor
                    </p>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <div className="text-stone-600 grid grid-cols-2 gap-4 text-sm">
                        {[
                          {
                            id: 'friendly-welcome',
                            label: 'Friendly welcome',
                            name: 'friendlyWelcome',
                            value: 'friendly welcome'
                          },
                          {
                            id: 'biblical-preaching',
                            label: 'Biblical preaching',
                            name: 'biblicalPreaching',
                            value: 'biblical preaching'
                          },
                          {
                            id: 'godly-atmosphere',
                            label: 'Godly atmosphere',
                            name: 'godlyAtmosphere',
                            value: 'Godly atmosphere'
                          },
                          {
                            id: 'engaging-worship',
                            label: 'Engaging worship',
                            name: 'engagingWorship',
                            value: 'engaging worship'
                          }
                        ].map((impressions) => (
                          <div key={impressions.id} className="flex items-center gap-2">
                            <label htmlFor={impressions.id} className="order-2">
                              {impressions.label}
                            </label>
                            <input
                              onChange={(e) =>
                                handleCheckbox('impressions', impressions.value, e.target.checked)
                              }
                              className="order-1 size-4"
                              type="checkbox"
                              name={impressions.name}
                              id={impressions.id}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* --------------------------------
                  STEP 5 - EXPECTATION
                  ---------------------------------
                */}
              {currentStep === 4 && (
                <div className="mx-auto max-w-2xl">
                  <div className="mb-8">
                    <span className="mb-3 inline-flex rounded-full bg-neutral-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-500">
                      Step 05
                    </span>

                    <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">
                      Visitor Expectations
                    </h2>
                  </div>

                  <div className="gap-3 grid grid-cols-2 text-stone-600 text-sm">
                    {[
                      { id: 'call-me', label: 'Call me for help', value: 'Call for help' },
                      { id: 'pay-a-visit', label: 'Pay a visit', value: 'Pay a visit' },
                      {
                        id: 'include-in-small-group',
                        label: 'Include in a small group',
                        value: 'Interested in small group'
                      },
                      {
                        id: 'become member',
                        label: 'Want to become a member',
                        value: 'Desires Membership'
                      }
                    ].map((expectation) => (
                      <div key={expectation.id} className="flex items-center gap-2">
                        <label htmlFor={expectation.id} className="order-2">
                          {expectation.label}
                        </label>
                        <input
                          className="order-1 size-4"
                          type="checkbox"
                          id={expectation.id}
                          onChange={(e) =>
                            handleCheckbox('expectation', expectation.value, e.target.checked)
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* --------------------------------
                  STEP 4 — ADDRESS
              -------------------------------- */}
              {currentStep === 5 && (
                <div className="mx-auto max-w-2xl">
                  <div className="mb-8">
                    <span className="mb-3 inline-flex rounded-full bg-neutral-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-500">
                      Step 06
                    </span>

                    <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">
                      Where are you based?
                    </h2>

                    <p className="mt-2 max-w-lg text-sm leading-6 text-neutral-500">
                      This information is completely optional. It can help with pastoral care and
                      connecting you to the right ministry.
                    </p>
                  </div>

                  <div className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className={labelClass}>City</label>

                        <input
                          value={visitor.address.city}
                          onChange={(event) => updateField(['address', 'city'], event.target.value)}
                          placeholder="Bloemfontein"
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label className={labelClass}>Province</label>

                        <input
                          value={visitor.address.province}
                          onChange={(event) =>
                            updateField(['address', 'province'], event.target.value)
                          }
                          placeholder="Free State"
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className={labelClass}>Area / suburb</label>

                        <input
                          value={visitor.address.area}
                          onChange={(event) => updateField(['address', 'area'], event.target.value)}
                          placeholder="Suburb"
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label className={labelClass}>Postal code</label>

                        <input
                          value={visitor.address.code}
                          onChange={(event) => updateField(['address', 'code'], event.target.value)}
                          placeholder="9301"
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className={labelClass}>Street name</label>

                        <input
                          value={visitor.address.streetName}
                          onChange={(event) =>
                            updateField(['address', 'streetName'], event.target.value)
                          }
                          placeholder="Street name"
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label className={labelClass}>House number</label>

                        <input
                          value={visitor.address.houseNumber}
                          onChange={(event) =>
                            updateField(['address', 'houseNumber'], event.target.value)
                          }
                          placeholder="12"
                          className={inputClass}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 6 && (
                <div className="mx-auto max-w-2xl">
                  <div className="mb-8">
                    <span className="mb-3 inline-flex rounded-full bg-neutral-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-500">
                      Step 7
                    </span>

                    <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">
                      Review your details.
                    </h2>

                    <p className="mt-2 max-w-lg text-sm leading-6 text-neutral-500">
                      Everything looks good? Review the information below before creating the
                      visitor profile.
                    </p>
                  </div>

                  <div className="space-y-6">
                    {/* Personal information */}
                    <div className="rounded-2xl border border-neutral-200 bg-white p-5">
                      <div className="mb-4 flex items-center justify-between">
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-400">
                            Personal
                          </p>
                          <h3 className="mt-1 text-sm font-semibold text-neutral-950">About you</h3>
                        </div>

                        <User size={17} className="text-neutral-400" />
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        {visitor.fullName?.trim() && (
                          <div>
                            <p className="text-[11px] text-neutral-400">Full name</p>
                            <p className="mt-1 text-sm font-medium text-neutral-900">
                              {visitor.fullName}
                            </p>
                          </div>
                        )}

                        {visitor.dateOfBirth?.trim() && (
                          <div>
                            <p className="text-[11px] text-neutral-400">Date of birth</p>
                            <p className="mt-1 text-sm font-medium text-neutral-900">
                              {visitor.dateOfBirth}
                            </p>
                          </div>
                        )}

                        {visitor.gender?.trim() && (
                          <div>
                            <p className="text-[11px] text-neutral-400">Gender</p>
                            <p className="mt-1 text-sm font-medium text-neutral-900">
                              {visitor.gender}
                            </p>
                          </div>
                        )}

                        {visitor.maritalStatus?.trim() && (
                          <div>
                            <p className="text-[11px] text-neutral-400">Marital status</p>
                            <p className="mt-1 text-sm font-medium text-neutral-900">
                              {visitor.maritalStatus}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Contact */}
                    {(visitor.contactInformation?.preferedContactMethod ||
                      visitor.contactInformation?.contactPhoneOrLink) && (
                      <div className="rounded-2xl border border-neutral-200 bg-white p-5">
                        <div className="mb-4 flex items-center justify-between">
                          <div>
                            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-400">
                              Contact
                            </p>
                            <h3 className="mt-1 text-sm font-semibold text-neutral-950">
                              Stay connected
                            </h3>
                          </div>

                          <Phone size={17} className="text-neutral-400" />
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                          {visitor.contactInformation.preferedContactMethod?.trim() && (
                            <div>
                              <p className="text-[11px] text-neutral-400">Preferred method</p>

                              <p className="mt-1 text-sm font-medium capitalize text-neutral-900">
                                {visitor.contactInformation.preferedContactMethod}
                              </p>
                            </div>
                          )}

                          {visitor.contactInformation.contactPhoneOrLink?.trim() && (
                            <div>
                              <p className="text-[11px] text-neutral-400">Contact details</p>

                              <p className="mt-1 text-sm font-medium text-neutral-900">
                                {visitor.contactInformation.contactPhoneOrLink}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Visit */}
                    {(visitor.isFirstTimer || visitor.notes?.trim()) && (
                      <div className="rounded-2xl border border-neutral-200 bg-white p-5">
                        <div className="mb-4 flex items-center justify-between">
                          <div>
                            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-400">
                              Visit
                            </p>
                            <h3 className="mt-1 text-sm font-semibold text-neutral-950">
                              Your visit
                            </h3>
                          </div>

                          <Users size={17} className="text-neutral-400" />
                        </div>

                        <div className="space-y-4">
                          {visitor.isFirstTimer?.trim() && (
                            <div>
                              <p className="text-[11px] text-neutral-400">First visit</p>

                              <p className="mt-1 text-sm font-medium text-neutral-900">
                                {visitor.isFirstTimer}
                              </p>
                            </div>
                          )}

                          {visitor.notes?.trim() && (
                            <div>
                              <p className="text-[11px] text-neutral-400">Notes</p>

                              <p className="mt-1 text-sm leading-6 text-neutral-700">
                                {visitor.notes}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Impressions */}
                    {visitor.impressions?.length > 0 && (
                      <div className="rounded-2xl border border-neutral-200 bg-white p-5">
                        <div className="mb-4 flex items-center justify-between">
                          <div>
                            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-400">
                              Impressions
                            </p>

                            <h3 className="mt-1 text-sm font-semibold text-neutral-950">
                              First impressions
                            </h3>
                          </div>

                          <FaceGrinning size={17} className="text-neutral-400" />
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {visitor.impressions.map((impression) => (
                            <span
                              key={impression}
                              className="rounded-full bg-neutral-100 px-3 py-1.5 text-[11px] font-medium text-neutral-700"
                            >
                              {impression}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Expectations */}
                    {visitor.expectation?.length > 0 && (
                      <div className="rounded-2xl border border-neutral-200 bg-white p-5">
                        <div className="mb-4 flex items-center justify-between">
                          <div>
                            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-400">
                              Expectations
                            </p>

                            <h3 className="mt-1 text-sm font-semibold text-neutral-950">
                              How we can support you
                            </h3>
                          </div>

                          <Star size={17} className="text-neutral-400" />
                        </div>

                        <div className="space-y-2">
                          {visitor.expectation.map((item) => (
                            <div
                              key={item}
                              className="flex items-center gap-3 rounded-xl bg-neutral-50 px-3 py-2.5"
                            >
                              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-white">
                                <Check size={11} strokeWidth={3} />
                              </div>

                              <span className="text-[12px] font-medium text-neutral-700">
                                {item}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Address */}
                    {(visitor.address?.city ||
                      visitor.address?.province ||
                      visitor.address?.area ||
                      visitor.address?.code ||
                      visitor.address?.streetName ||
                      visitor.address?.houseNumber) && (
                      <div className="rounded-2xl border border-neutral-200 bg-white p-5">
                        <div className="mb-4 flex items-center justify-between">
                          <div>
                            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-400">
                              Address
                            </p>

                            <h3 className="mt-1 text-sm font-semibold text-neutral-950">
                              Where you're based
                            </h3>
                          </div>

                          <MapPin size={17} className="text-neutral-400" />
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                          {visitor.address.city?.trim() && (
                            <div>
                              <p className="text-[11px] text-neutral-400">City</p>
                              <p className="mt-1 text-sm font-medium text-neutral-900">
                                {visitor.address.city}
                              </p>
                            </div>
                          )}

                          {visitor.address.province?.trim() && (
                            <div>
                              <p className="text-[11px] text-neutral-400">Province</p>
                              <p className="mt-1 text-sm font-medium capitalize text-neutral-900">
                                {visitor.address.province}
                              </p>
                            </div>
                          )}

                          {visitor.address.area?.trim() && (
                            <div>
                              <p className="text-[11px] text-neutral-400">Area / suburb</p>
                              <p className="mt-1 text-sm font-medium text-neutral-900">
                                {visitor.address.area}
                              </p>
                            </div>
                          )}

                          {visitor.address.code?.trim() && (
                            <div>
                              <p className="text-[11px] text-neutral-400">Postal code</p>
                              <p className="mt-1 text-sm font-medium text-neutral-900">
                                {visitor.address.code}
                              </p>
                            </div>
                          )}

                          {visitor.address.streetName?.trim() && (
                            <div>
                              <p className="text-[11px] text-neutral-400">Street</p>
                              <p className="mt-1 text-sm font-medium text-neutral-900">
                                {visitor.address.streetName}
                              </p>
                            </div>
                          )}

                          {visitor.address.houseNumber?.trim() && (
                            <div>
                              <p className="text-[11px] text-neutral-400">House number</p>
                              <p className="mt-1 text-sm font-medium text-neutral-900">
                                {visitor.address.houseNumber}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-neutral-100 bg-neutral-50/70 px-6 py-4 md:px-8">
              <button
                type="button"
                onClick={previousStep}
                disabled={currentStep === 0}
                className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-[12px] font-medium text-neutral-500 transition-all hover:bg-white hover:text-neutral-900 disabled:pointer-events-none disabled:opacity-30"
              >
                <ChevronLeft size={15} />
                Previous
              </button>

              <div className="flex items-center gap-2">
                <span className="text-[11px] text-neutral-400">
                  {currentStep + 1} of {steps.length}
                </span>

                {currentStep < steps.length - 1 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={!canContinue}
                    className="flex items-center gap-2 rounded-xl bg-neutral-950 px-5 py-2.5 text-[12px] font-medium text-white transition-all hover:bg-neutral-800 disabled:pointer-events-none disabled:opacity-40"
                  >
                    Continue
                    <ChevronRight size={15} />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={submitVisitor}
                    disabled={isSubmitting}
                    className="flex items-center gap-2 rounded-xl bg-neutral-950 px-5 py-2.5 text-[12px] font-medium text-white transition-all hover:bg-neutral-800 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Saving...' : 'Create visitor'}
                    {!isSubmitting && <ArrowRight size={15} />}
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>

        {/* Privacy note */}
        <p className="mx-auto mt-4 max-w-xl text-center text-[10px] leading-5 text-neutral-400">
          Only provide information you are comfortable sharing. Your profile can be updated as your
          relationship with the church develops.
        </p>
      </div>
    </section>
  )
}

export default VisitorForm
