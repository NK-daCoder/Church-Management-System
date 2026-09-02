import React, { useMemo, useState } from 'react'
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Mail,
  MapPin,
  Phone,
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
    id: 'address',
    title: 'Address',
    description: 'Optional location information.',
    icon: MapPin
  }
]

const inputClass =
  'w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-[14px] text-neutral-900 outline-none transition-all placeholder:text-neutral-400 focus:border-neutral-900 focus:bg-white focus:ring-4 focus:ring-neutral-900/5'

const labelClass = 'mb-2 block text-[12px] font-medium tracking-wide text-neutral-600'

const VisitorForm = ({ setView, onSubmit }) => {
  const { peopleTemplate: visitor, setPeopleTemplate: setVisitor } = usePeopleContext()
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

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
      setCurrentStep((step) => step + 1)
    }
  }

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep((step) => step - 1)
    }
  }

  const submitVisitor = async (event) => {
    event.preventDefault()

    setIsSubmitting(true)

    try {
      console.log(visitor)

      if (onSubmit) {
        await onSubmit(visitor)
      }

      setVisitor(peopleProfileTemplate)

      setView('people')
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
          <form onSubmit={submitVisitor}>
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
                            className="rounded-2xl border border-neutral-200 bg-white px-4 py-4 text-left transition-all hover:border-neutral-400 hover:bg-neutral-50"
                          >
                            <p className="text-sm font-semibold text-neutral-900">{value}</p>

                            <p className="mt-1 text-[11px] text-neutral-400">
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
                      <label className={labelClass}>Anything you'd like us to know?</label>

                      <textarea
                        rows={4}
                        placeholder="Optional"
                        className={`${inputClass} resize-none`}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* --------------------------------
                  STEP 4 — ADDRESS
              -------------------------------- */}
              {currentStep === 3 && (
                <div className="mx-auto max-w-2xl">
                  <div className="mb-8">
                    <span className="mb-3 inline-flex rounded-full bg-neutral-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-500">
                      Step 04
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
                    type="submit"
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
