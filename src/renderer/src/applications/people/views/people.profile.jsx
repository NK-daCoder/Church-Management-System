import { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import {
  Activity,
  BriefcaseBusiness,
  CalendarDays,
  ChevronRight,
  CircleUserRound,
  Clock3,
  Edit3,
  GraduationCap,
  Heart,
  Home,
  Mail,
  MapPin,
  Phone,
  School,
  UserRound,
  Users,
  Cake,
  VenusAndMars,
  ShieldCheck,
  Sparkles,
  Camera,
  Plus,
  MoreHorizontal,
  MapPinned,
  ChevronLeft
} from 'lucide-react'

/* -------------------------------------------------------------------------- */
/* Helpers                                                                     */
/* -------------------------------------------------------------------------- */

const formatValue = (value) => {
  if (!value) return 'Not provided'

  return String(value)
    .replaceAll('_', ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

const formatDate = (date) => {
  if (!date) return 'Not provided'

  const parsed = new Date(date)

  if (Number.isNaN(parsed.getTime())) {
    return date
  }

  return new Intl.DateTimeFormat('en-ZA', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(parsed)
}

/* -------------------------------------------------------------------------- */
/* Reusable UI                                                                */
/* -------------------------------------------------------------------------- */

const Section = ({ icon: Icon, title, description, action, children }) => {
  return (
    <section className="overflow-hidden rounded-3xl border border-black/[0.07] bg-white shadow-[0_8px_35px_rgba(0,0,0,0.035)]">
      <div className="flex items-start justify-between gap-6 border-b border-black/[0.06] px-6 py-5 sm:px-7">
        <div className="flex min-w-0 items-start gap-3">
          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-black/[0.045] text-black/65">
            <Icon size={18} strokeWidth={1.8} />
          </div>

          <div>
            <h2 className="text-[15px] font-semibold tracking-[-0.01em] text-black">{title}</h2>

            {description && (
              <p className="mt-1 text-[13px] leading-5 text-black/45">{description}</p>
            )}
          </div>
        </div>

        {action}
      </div>

      <div className="p-6 sm:p-7">{children}</div>
    </section>
  )
}

Section.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  action: PropTypes.node,
  children: PropTypes.node
}

const InfoItem = ({ icon: Icon, label, value, large = false }) => {
  return (
    <div className="flex min-w-0 gap-3">
      {Icon && (
        <div className="mt-0.5 shrink-0 text-black/35">
          <Icon size={17} strokeWidth={1.7} />
        </div>
      )}

      <div className="min-w-0">
        <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-black/35">{label}</p>

        <p
          className={[
            'mt-1 break-words text-black',
            large ? 'text-[15px] font-medium' : 'text-[14px]'
          ].join(' ')}
        >
          {value || 'Not provided'}
        </p>
      </div>
    </div>
  )
}

InfoItem.propTypes = {
  icon: PropTypes.elementType,
  label: PropTypes.string.isRequired,
  value: PropTypes.node,
  large: PropTypes.bool
}

const EmptyState = ({ icon: Icon = Users, title, description, action }) => {
  return (
    <div className="flex min-h-[220px] flex-col items-center justify-center rounded-2xl border border-dashed border-black/[0.1] bg-black/[0.015] px-6 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black/[0.045] text-black/45">
        <Icon size={21} strokeWidth={1.7} />
      </div>

      <h3 className="mt-4 text-[14px] font-semibold text-black">{title}</h3>

      <p className="mt-1 max-w-sm text-[13px] leading-5 text-black/40">{description}</p>

      {action && (
        <button
          type="button"
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-black px-4 py-2.5 text-[12px] font-medium text-white transition hover:bg-black/85"
        >
          <Plus size={15} />
          {action}
        </button>
      )}
    </div>
  )
}

EmptyState.propTypes = {
  icon: PropTypes.elementType,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  action: PropTypes.node
}

/* -------------------------------------------------------------------------- */
/* Member Header                                                              */
/* -------------------------------------------------------------------------- */

const MemberHeader = ({ member, setView, setFormMode }) => {
  const initials = useMemo(() => {
    return member.fullName
      .split(' ')
      .map((name) => name[0])
      .join('')
      .slice(0, 2)
      .toUpperCase()
  }, [member.fullName])

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-black/[0.07] bg-white shadow-[0_12px_45px_rgba(0,0,0,0.055)]">
      {/* subtle background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,0,0,0.055),transparent_35%)]" />

      <div className="relative p-6 sm:p-8">
        <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 items-center gap-5">
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="flex h-20 w-20 items-center justify-center rounded-[24px] bg-black text-xl font-semibold tracking-tight text-white shadow-[0_8px_25px_rgba(0,0,0,0.15)] sm:h-24 sm:w-24 sm:text-2xl">
                {initials}
              </div>

              <button
                type="button"
                aria-label="Change profile image"
                className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-xl border-2 border-white bg-white text-black shadow-md transition hover:scale-105"
              >
                <Camera size={14} />
              </button>
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="truncate text-2xl font-semibold tracking-[-0.035em] text-black sm:text-[30px]">
                  {member.fullName}
                </h1>

                <span className="inline-flex items-center gap-1.5 rounded-full bg-black/[0.055] px-2.5 py-1 text-[11px] font-medium text-black/60">
                  <ShieldCheck size={12} />
                  {member.additionalInformation.status}
                </span>
              </div>

              <p className="mt-2 text-[13px] text-black/45">
                Member ID · {member.id.slice(0, 8)}...
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] text-black/55">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin size={14} />
                  {formatValue(member.address.city)}
                </span>

                <span className="inline-flex items-center gap-1.5">
                  <Phone size={14} />
                  {member.contactInformation.contactPhoneOrLink}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-black/[0.08] bg-white px-4 text-[12px] font-medium text-black/70 shadow-sm transition hover:border-black/[0.15] hover:bg-black/[0.025]"
              onClick={() => {
                setFormMode('edit')
                setView('membershipForm')
              }}
            >
              <Edit3 size={15} />
              Edit profile
            </button>

            <button
              type="button"
              aria-label="More member actions"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/[0.08] text-black/50 transition hover:bg-black/[0.04]"
            >
              <MoreHorizontal size={17} />
            </button>
          </div>
        </div>

        {/* Quick member metadata */}
        <div className="mt-8 grid grid-cols-2 gap-3 border-t border-black/[0.06] pt-6 sm:grid-cols-4">
          <QuickStat icon={UserRound} label="Gender" value={formatValue(member.gender)} />

          <QuickStat
            icon={Heart}
            label="Marital status"
            value={formatValue(member.maritalStatus)}
          />

          <QuickStat
            icon={Sparkles}
            label="Life stage"
            value={formatValue(member.stageOfHumanDevelopment)}
          />

          <QuickStat icon={CalendarDays} label="Joined" value={formatDate(member.createdAt)} />
        </div>
      </div>
    </div>
  )
}

MemberHeader.propTypes = {
  member: PropTypes.object.isRequired,
  setView: PropTypes.func.isRequired,
  setFormMode: PropTypes.func.isRequired
}

const QuickStat = ({ icon: Icon, label, value }) => {
  return (
    <div className="rounded-2xl bg-black/[0.025] px-4 py-3">
      <div className="flex items-center gap-2 text-black/35">
        <Icon size={14} />
        <span className="text-[10px] font-medium uppercase tracking-[0.08em]">{label}</span>
      </div>

      <p className="mt-1.5 truncate text-[13px] font-medium text-black/75">{value}</p>
    </div>
  )
}

QuickStat.propTypes = {
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.node])
}

const FamilyMemberCard = ({ familyMember }) => {
  const initials = (familyMember.familyMemberFullName || 'Unknown Member')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((name) => name[0])
    .join('')
    .toUpperCase()

  return (
    <article
      className="group relative overflow-hidden rounded-2xl border border-black/[0.07] bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.025)] transition-all duration-200 hover:-translate-y-0.5 hover:border-black/[0.12] hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)]"
      aria-label={`${familyMember.familyMemberFullName}, ${formatValue(familyMember.relation)}`}
    >
      {/* Subtle premium background detail */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-black/[0.025] transition-transform duration-300 group-hover:scale-125"
      />

      <div className="relative">
        {/* Identity */}
        <div className="flex items-start gap-4">
          <div
            aria-hidden="true"
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-black/[0.06] bg-[#f5f5f3] text-sm font-semibold tracking-wide text-black/70"
          >
            {initials}
          </div>

          <div className="min-w-0 flex-1 pt-0.5">
            <h3 className="break-words text-[15px] font-semibold tracking-[-0.025em] text-black">
              {familyMember.familyMemberFullName || 'Unnamed family member'}
            </h3>

            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-black/[0.07] bg-black/[0.025] px-2.5 py-1 text-[10px] font-medium capitalize text-black/60">
                <Users size={12} aria-hidden="true" />
                {formatValue(familyMember.relation)}
              </span>

              {familyMember.gender && (
                <span className="text-[11px] text-black/40">{familyMember.gender}</span>
              )}
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="mt-5 grid grid-cols-1 gap-3 border-t border-black/[0.06] pt-4 sm:grid-cols-2">
          <div className="flex min-w-0 items-start gap-2.5">
            <div className="mt-0.5 text-black/35">
              <Cake size={15} aria-hidden="true" />
            </div>

            <div className="min-w-0">
              <p className="text-[10px] font-medium uppercase tracking-[0.08em] text-black/35">
                Date of birth
              </p>
              <p className="mt-1 break-words text-[12px] font-medium text-black/75">
                {formatDate(familyMember.dateOfBirth)}
              </p>
            </div>
          </div>

          <div className="flex min-w-0 items-start gap-2.5">
            <div className="mt-0.5 text-black/35">
              <Sparkles size={15} aria-hidden="true" />
            </div>

            <div className="min-w-0">
              <p className="text-[10px] font-medium uppercase tracking-[0.08em] text-black/35">
                Life stage
              </p>
              <p className="mt-1 break-words text-[12px] font-medium text-black/75">
                {familyMember.stageOfDevelopment || 'Not provided'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

FamilyMemberCard.propTypes = {
  familyMember: PropTypes.shape({
    id: PropTypes.string.isRequired,
    familyMemberFullName: PropTypes.string,
    relation: PropTypes.string,
    dateOfBirth: PropTypes.string,
    stageOfDevelopment: PropTypes.string,
    gender: PropTypes.string
  }).isRequired
}

const ProfileNavigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    {
      id: 'analytics',
      label: 'Analytics',
      icon: Activity
    },
    {
      id: 'attendance',
      label: 'Attendance',
      icon: Clock3
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: CircleUserRound
    }
  ]

  return (
    <div className="sticky top-4 z-20 rounded-2xl border border-black/[0.07] bg-white/90 p-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-xl">
      <nav className="flex items-center gap-1" aria-label="Member profile navigation">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const active = activeTab === tab.id

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={[
                'group relative flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-[12px] font-medium transition-all duration-200 sm:flex-none sm:min-w-[130px]',
                active
                  ? 'bg-black text-white shadow-[0_4px_14px_rgba(0,0,0,0.14)]'
                  : 'text-black/45 hover:bg-black/[0.04] hover:text-black/70'
              ].join(' ')}
            >
              <Icon size={15} strokeWidth={active ? 2 : 1.7} />
              {tab.label}
            </button>
          )
        })}
      </nav>
    </div>
  )
}

ProfileNavigation.propTypes = {
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired
}

const ProfileView = ({ member }) => {
  const occupation = member.additionalInformation.occupation?.[0]
  const hobby = member.additionalInformation.hobbies?.[0]

  return (
    <div className="space-y-5">
      {/* Personal information */}
      <Section
        icon={UserRound}
        title="Personal information"
        description="Core identity and personal details."
        action={
          <button type="button" className="text-black/35 transition hover:text-black">
            <Edit3 size={16} />
          </button>
        }
      >
        <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
          <InfoItem icon={UserRound} label="Full name" value={member.fullName} large />
          <InfoItem icon={Cake} label="Date of birth" value={formatDate(member.dateOfBirth)} />
          <InfoItem icon={VenusAndMars} label="Gender" value={formatValue(member.gender)} />
          <InfoItem icon={Heart} label="Marital status" value={formatValue(member.maritalStatus)} />
          <InfoItem
            icon={Sparkles}
            label="Human development stage"
            value={formatValue(member.stageOfHumanDevelopment)}
          />
          <InfoItem
            icon={CalendarDays}
            label="Anniversary date"
            value={formatDate(member.anniversaryDate)}
          />
        </div>
      </Section>

      {/* Contact */}
      <Section
        icon={Phone}
        title="Contact information"
        description="How this member can be reached."
      >
        <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
          <InfoItem
            icon={Phone}
            label="Preferred contact"
            value={formatValue(member.contactInformation.preferedContactMethod)}
          />

          <InfoItem
            icon={Phone}
            label="Primary contact"
            value={member.contactInformation.contactPhoneOrLink}
          />

          {member.contactInformation.other?.map((contact) => (
            <InfoItem
              key={contact.id}
              icon={Mail}
              label={formatValue(contact.platform)}
              value={contact.contact}
            />
          ))}
        </div>
      </Section>

      {/* Address */}
      <Section
        icon={Home}
        title="Residential information"
        description="Current residential address."
      >
        <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
          <InfoItem
            icon={MapPinned}
            label="Street"
            value={`${member.address.houseNumber}, ${formatValue(member.address.streetName)}`}
          />

          <InfoItem icon={MapPin} label="Area" value={formatValue(member.address.area)} />

          <InfoItem icon={MapPin} label="City" value={formatValue(member.address.city)} />

          <InfoItem icon={MapPin} label="Province" value={formatValue(member.address.province)} />

          <InfoItem icon={MapPin} label="Postal code" value={member.address.code} />

          <InfoItem icon={Home} label="House type" value={formatValue(member.address.houseType)} />
        </div>
      </Section>

      {/* Education */}
      <Section icon={GraduationCap} title="Education" description="Educational background.">
        <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
          <InfoItem
            icon={School}
            label="Institution"
            value={member.additionalInformation.school?.schoolName}
          />

          <InfoItem
            icon={GraduationCap}
            label="Education level"
            value={formatValue(member.additionalInformation.school?.educationLevel)}
          />
        </div>
      </Section>

      {/* Employment */}
      <Section
        icon={BriefcaseBusiness}
        title="Employment"
        description="Current occupation and professional information."
        action={
          <button
            type="button"
            className="inline-flex items-center gap-1.5 text-[12px] font-medium text-black/45 transition hover:text-black"
          >
            <Plus size={15} />
            Add
          </button>
        }
      >
        {occupation ? (
          <div className="rounded-2xl border border-black/[0.06] bg-black/[0.018] p-5">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-[16px] font-semibold tracking-[-0.02em] text-black">
                  {occupation.occupation}
                </p>

                <p className="mt-1 text-[13px] text-black/45">{occupation.specialization}</p>
              </div>

              <span className="w-fit rounded-full bg-black/[0.06] px-3 py-1 text-[11px] font-medium text-black/50">
                Current
              </span>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-3">
              <InfoItem label="Employer" value={occupation.employer} />

              <InfoItem label="Work phone" value={occupation.workPhone} />

              <InfoItem label="Emergency phone" value={occupation.workEmergencyPhone} />
            </div>
          </div>
        ) : (
          <EmptyState
            icon={BriefcaseBusiness}
            title="No employment information"
            description="There is currently no occupation recorded for this member."
            action="Add occupation"
          />
        )}
      </Section>

      {/* Hobbies */}
      <Section
        icon={Heart}
        title="Interests & hobbies"
        description="Activities and interests associated with this member."
        action={
          <button
            type="button"
            className="inline-flex items-center gap-1.5 text-[12px] font-medium text-black/45 transition hover:text-black"
          >
            <Plus size={15} />
            Add
          </button>
        }
      >
        {hobby ? (
          <div className="flex flex-wrap gap-3">
            <div className="group flex items-center gap-3 rounded-2xl border border-black/[0.06] bg-black/[0.018] px-4 py-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-black/50 shadow-sm">
                <Camera size={16} />
              </div>

              <div>
                <p className="text-[13px] font-medium text-black/75">{hobby.hobbyName}</p>

                <p className="mt-0.5 text-[11px] text-black/35">
                  {formatValue(hobby.hobbyType)}
                  {hobby.isProfessionalSkill && ' · Professional skill'}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <EmptyState
            icon={Heart}
            title="No hobbies recorded"
            description="Add interests and hobbies to better understand this member."
            action="Add hobby"
          />
        )}
      </Section>

      {/* Family */}
      <Section
        icon={Users}
        title="Family"
        description="Family members and household relationships."
        action={
          <button
            type="button"
            className="inline-flex items-center gap-1.5 text-[12px] font-medium text-black/45 transition hover:text-black"
          >
            <Plus size={15} />
            Add
          </button>
        }
      >
        {member.family?.length > 0 ? (
          <ul className="flex flex-wrap gap-3">
            {member.family.map((fm) => (
              <li key={fm.id} className="grow">
                <FamilyMemberCard familyMember={fm} />
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState
            icon={Users}
            title="No family members linked"
            description="Family relationships connected to this member will appear here."
            action="Add family member"
          />
        )}
      </Section>

      {/* Expectations */}
      <Section
        icon={Sparkles}
        title="Pastoral information"
        description="Expectations and impressions captured during member engagement."
      >
        {member.additionalInformation.expectation?.length > 0 ||
        member.additionalInformation.impressions?.length > 0 ? (
          <div>{/* Future pastoral information */}</div>
        ) : (
          <EmptyState
            icon={Sparkles}
            title="No pastoral information"
            description="Expectations, impressions, and pastoral notes will appear here when recorded."
          />
        )}
      </Section>
    </div>
  )
}

ProfileView.propTypes = {
  member: PropTypes.object.isRequired
}

/* -------------------------------------------------------------------------- */
/* Attendance View                                                            */
/* -------------------------------------------------------------------------- */

const AttendanceView = () => {
  return (
    <div className="space-y-5">
      <Section
        icon={Clock3}
        title="Attendance record"
        description="A chronological record of this member's attendance."
        action={
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl border border-black/[0.08] px-3 py-2 text-[11px] font-medium text-black/55 transition hover:bg-black/[0.03]"
          >
            <CalendarDays size={14} />
            Select period
          </button>
        }
      >
        <EmptyState
          icon={CalendarDays}
          title="Attendance history"
          description="Attendance records will appear here once attendance data has been connected."
        />
      </Section>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <MiniMetric label="Present" value="—" description="Recorded attendance" />

        <MiniMetric label="Absent" value="—" description="Recorded absences" />

        <MiniMetric label="Last attended" value="—" description="Most recent service" />
      </div>
    </div>
  )
}

const MiniMetric = ({ label, value, description }) => {
  return (
    <div className="rounded-3xl border border-black/[0.07] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.035)]">
      <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-black/35">{label}</p>

      <p className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-black">{value}</p>

      <p className="mt-1 text-[12px] text-black/35">{description}</p>
    </div>
  )
}

MiniMetric.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
}

/* -------------------------------------------------------------------------- */
/* Analytics View                                                             */
/* -------------------------------------------------------------------------- */

const AnalyticsView = () => {
  return (
    <div className="space-y-5">
      <Section
        icon={Activity}
        title="Member analytics"
        description="A future overview of engagement, attendance and member activity."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnalyticsPlaceholder
            icon={Clock3}
            title="Attendance"
            description="Attendance trends and consistency."
          />

          <AnalyticsPlaceholder
            icon={Users}
            title="Engagement"
            description="Ministry and church engagement."
          />

          <AnalyticsPlaceholder
            icon={Sparkles}
            title="Member journey"
            description="Progress through the member lifecycle."
          />
        </div>
      </Section>

      <Section
        icon={Activity}
        title="Activity timeline"
        description="Important events associated with this member."
      >
        <EmptyState
          icon={Activity}
          title="No activity yet"
          description="Member activity will appear here as the church management system records events."
        />
      </Section>
    </div>
  )
}

const AnalyticsPlaceholder = ({ icon: Icon, title, description }) => {
  return (
    <div className="rounded-2xl border border-black/[0.06] bg-black/[0.018] p-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-black/45 shadow-sm">
        <Icon size={17} />
      </div>

      <h3 className="mt-5 text-[14px] font-semibold text-black">{title}</h3>

      <p className="mt-1 text-[12px] leading-5 text-black/40">{description}</p>

      <div className="mt-5 h-2 overflow-hidden rounded-full bg-black/[0.06]">
        <div className="h-full w-0 rounded-full bg-black" />
      </div>

      <div className="mt-2 flex justify-between">
        <span className="text-[10px] text-black/30">Data unavailable</span>

        <span className="text-[10px] text-black/30">—</span>
      </div>
    </div>
  )
}

AnalyticsPlaceholder.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
}

/* -------------------------------------------------------------------------- */
/* Main component                                                              */
/* -------------------------------------------------------------------------- */

const MemberProfile = ({ memberProfile, setFormMode, setView }) => {
  const [activeTab, setActiveTab] = useState('profile')

  return (
    <main className="min-h-screen bg-[#f7f7f5] px-4 py-5 text-black sm:px-6 lg:px-8">
      <div className="space-y-4 mx-auto max-w-[1380px]">
        <button
          onClick={() => setView('people')}
          type="button"
          className="bg-gradient-to-bl to-white from-stone-200/5 text-xs tracking-wide font-semibold gap-2 text-stone-600 flex items-center px-4 h-8 rounded-lg bg-white shadow hover:opacity-80 cursor-pointer"
        >
          <ChevronLeft size={16} />
          Go back
        </button>

        {/* Member identity */}
        <MemberHeader setView={setView} member={memberProfile} setFormMode={setFormMode} />

        {/* Navigation */}
        <div className="mt-5">
          <ProfileNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        {/* Content */}
        <div className="mt-5 pb-12">
          {activeTab === 'profile' && <ProfileView member={memberProfile} />}
          {activeTab === 'attendance' && <AttendanceView />}
          {activeTab === 'analytics' && <AnalyticsView />}
        </div>
      </div>
    </main>
  )
}

MemberProfile.propTypes = {
  memberProfile: PropTypes.object,
  setFormMode: PropTypes.func,
  setView: PropTypes.func
}

export default MemberProfile
