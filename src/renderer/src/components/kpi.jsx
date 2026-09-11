import React from 'react'
import PropTypes from 'prop-types'
import { ArrowDownRight, ArrowUpRight, Minus, MoreHorizontal } from 'lucide-react'

/**
 * ---------------------------------------------------------
 * KPI DESIGN SYSTEM
 * ---------------------------------------------------------
 *
 * Four Apple-inspired KPI variations:
 *
 * 1. minimal
 * 2. elevated
 * 3. split
 * 4. spotlight
 *
 * Usage:
 *
 * <KPI
 *   variant="minimal"
 *   title="Total Members"
 *   value="1,248"
 *   change="+12.5%"
 *   trend="up"
 *   icon={Users}
 * />
 */

const trendConfig = {
  up: {
    icon: ArrowUpRight,
    text: 'text-emerald-600',
    bg: 'bg-emerald-500/10'
  },

  down: {
    icon: ArrowDownRight,
    text: 'text-red-500',
    bg: 'bg-red-500/10'
  },

  neutral: {
    icon: Minus,
    text: 'text-zinc-500',
    bg: 'bg-zinc-500/10'
  }
}

const iconConfig = {
  neutral: {
    icon: 'text-zinc-600',
    background: 'bg-zinc-100'
  },

  blue: {
    icon: 'text-blue-600',
    background: 'bg-blue-500/10'
  },

  green: {
    icon: 'text-emerald-600',
    background: 'bg-emerald-500/10'
  },

  orange: {
    icon: 'text-orange-600',
    background: 'bg-orange-500/10'
  },

  purple: {
    icon: 'text-purple-600',
    background: 'bg-purple-500/10'
  },

  red: {
    icon: 'text-red-600',
    background: 'bg-red-500/10'
  }
}

function Trend({ value, trend = 'neutral' }) {
  if (!value) return null

  const config = trendConfig[trend] ?? trendConfig.neutral
  const TrendIcon = config.icon

  return (
    <span
      className={`
        inline-flex
        items-center
        gap-0.5
        rounded-full
        px-2
        py-1
        text-xs
        font-medium
        ${config.text}
        ${config.bg}
      `}
    >
      <TrendIcon size={13} strokeWidth={2} />
      {value}
    </span>
  )
}

function IconContainer({ icon: Icon, color = 'neutral', size = 'md' }) {
  if (!Icon) return null

  const config = iconConfig[color] ?? iconConfig.neutral

  const sizes = {
    sm: 'size-9 rounded-xl',
    md: 'size-11 rounded-[14px]',
    lg: 'size-12 rounded-[15px]'
  }

  const iconSizes = {
    sm: 17,
    md: 19,
    lg: 21
  }

  return (
    <div
      className={`
        flex
        shrink-0
        items-center
        justify-center
        ${sizes[size]}
        ${config.background}
        ${config.icon}
      `}
    >
      <Icon size={iconSizes[size]} strokeWidth={1.8} />
    </div>
  )
}

/**
 * ---------------------------------------------------------
 * 1. MINIMAL KPI
 * ---------------------------------------------------------
 *
 * Best for:
 * Dashboard grids
 * Dense information
 * Apple-like interfaces
 */

/**
 * @param {object} param0
 * @param {string} param0.title
 * @param {number} param0.value
 * @param {string} param0.subtitle
 * @param {*} param0.change
 * @param {string} [param0.trend='neutral']
 * @param {*} param0.icon
 * @param {string} [param0.iconColor='neutral']
 * @param {*} param0.footer
 * @param {function} param0.onClick
 */

function MinimalKPI({
  title,
  value,
  subtitle,
  change,
  trend = 'neutral',
  icon,
  iconColor = 'neutral',
  footer,
  onClick
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        group
        w-full
        text-left
        rounded-2xl
        border
        border-zinc-200/70
        bg-white
        p-5
        transition-all
        duration-200
        hover:border-zinc-300
        hover:-translate-y-px
        focus:outline-none
        focus-visible:ring-2
        focus-visible:ring-zinc-900/20
      `}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[13px] font-medium tracking-[-0.01em] text-zinc-500">{title}</p>

          <p className="mt-2 text-[30px] font-semibold leading-none tracking-[-0.045em] text-zinc-950">
            {value}
          </p>

          {subtitle && <p className="mt-2 text-xs text-zinc-400">{subtitle}</p>}
        </div>

        <IconContainer icon={icon} color={iconColor} size="sm" />
      </div>

      {(change || footer) && (
        <div className="mt-5 flex items-center justify-between">
          <Trend value={change} trend={trend} />

          {footer && <span className="text-xs text-zinc-400">{footer}</span>}
        </div>
      )}
    </button>
  )
}

/**
 * ---------------------------------------------------------
 * 2. ELEVATED KPI
 * ---------------------------------------------------------
 *
 * Best for:
 * Primary dashboard statistics
 * Premium visual hierarchy
 */

function ElevatedKPI({
  title,
  value,
  subtitle,
  change,
  trend = 'neutral',
  icon,
  iconColor = 'blue',
  footer,
  onClick
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        group
        w-full
        rounded-[22px]
        bg-zinc-50
        p-px
        text-left
        shadow-[0_1px_2px_rgba(0,0,0,0.03)]
        transition-all
        duration-200
        hover:-translate-y-0.5
        hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]
        focus:outline-none
        focus-visible:ring-2
        focus-visible:ring-zinc-900/20
      "
    >
      <div className="rounded-[21px] bg-white p-5">
        <div className="flex items-center justify-between">
          <IconContainer icon={icon} color={iconColor} size="md" />

          <MoreHorizontal
            size={18}
            className="
              text-zinc-300
              transition-colors
              group-hover:text-zinc-500
            "
          />
        </div>

        <div className="mt-6">
          <p className="text-[13px] font-medium text-zinc-500">{title}</p>

          <div className="mt-2 flex items-end gap-3">
            <p className="text-[34px] font-semibold leading-none tracking-[-0.05em] text-zinc-950">
              {value}
            </p>

            <Trend value={change} trend={trend} />
          </div>

          {subtitle && <p className="mt-2 text-xs text-zinc-400">{subtitle}</p>}
        </div>

        {footer && (
          <div className="mt-5 border-t border-zinc-100 pt-4">
            <p className="text-xs text-zinc-400">{footer}</p>
          </div>
        )}
      </div>
    </button>
  )
}

/**
 * ---------------------------------------------------------
 * 3. SPLIT KPI
 * ---------------------------------------------------------
 *
 * Best for:
 * Finance
 * Attendance
 * Contributions
 * Operational metrics
 */

function SplitKPI({
  title,
  value,
  subtitle,
  change,
  trend = 'neutral',
  icon,
  iconColor = 'green',
  progress,
  progressLabel,
  onClick
}) {
  const safeProgress = Math.min(100, Math.max(0, progress ?? 0))

  return (
    <button
      type="button"
      onClick={onClick}
      className="
        group
        relative
        w-full
        overflow-hidden
        rounded-[22px]
        border
        border-zinc-200/70
        bg-white
        p-5
        text-left
        transition-all
        duration-200
        hover:border-zinc-300
        hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)]
        focus:outline-none
        focus-visible:ring-2
        focus-visible:ring-zinc-900/20
      "
    >
      <div className="flex items-center justify-between gap-5">
        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-medium text-zinc-500">{title}</p>

          <p className="mt-2 text-[32px] font-semibold leading-none tracking-[-0.05em] text-zinc-950">
            {value}
          </p>

          {subtitle && <p className="mt-2 text-xs text-zinc-400">{subtitle}</p>}

          {change && (
            <div className="mt-4">
              <Trend value={change} trend={trend} />
            </div>
          )}
        </div>

        <IconContainer icon={icon} color={iconColor} size="lg" />
      </div>

      {progress !== undefined && (
        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[11px] font-medium text-zinc-400">
              {progressLabel ?? 'Progress'}
            </span>

            <span className="text-[11px] font-medium text-zinc-500">{safeProgress}%</span>
          </div>

          <div className="h-1.5 overflow-hidden rounded-full bg-zinc-100">
            <div
              className="
                h-full
                rounded-full
                bg-zinc-900
                transition-all
                duration-500
              "
              style={{
                width: `${safeProgress}%`
              }}
            />
          </div>
        </div>
      )}
    </button>
  )
}

/**
 * ---------------------------------------------------------
 * 4. SPOTLIGHT KPI
 * ---------------------------------------------------------
 *
 * Best for:
 * Most important dashboard metric
 * Giving one statistic visual priority
 */

function SpotlightKPI({
  title,
  value,
  subtitle,
  change,
  trend = 'up',
  icon,
  iconColor = 'purple',
  description,
  onClick
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        group
        relative
        w-full
        overflow-hidden
        rounded-[26px]
        bg-zinc-950
        p-6
        text-left
        transition-all
        duration-200
        hover:-translate-y-0.5
        hover:shadow-[0_18px_45px_rgba(0,0,0,0.14)]
        focus:outline-none
        focus-visible:ring-2
        focus-visible:ring-zinc-950/30
      "
    >
      {/* Ambient glow */}
      <div
        className="
          pointer-events-none
          absolute
          -right-16
          -top-16
          size-40
          rounded-full
          bg-white/[0.04]
          blur-2xl
        "
      />

      <div className="relative">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[13px] font-medium text-zinc-400">{title}</p>

            <p className="mt-3 text-[42px] font-semibold leading-none tracking-[-0.06em] text-white">
              {value}
            </p>
          </div>

          <div
            className="
              flex
              size-11
              items-center
              justify-center
              rounded-[14px]
              bg-white/10
              text-white
              backdrop-blur-sm
            "
          >
            {icon &&
              React.createElement(icon, {
                size: 20,
                strokeWidth: 1.8
              })}
          </div>
        </div>

        <div className="mt-5 flex items-center gap-3">
          {change && (
            <span
              className={`
                inline-flex
                items-center
                gap-1
                rounded-full
                px-2.5
                py-1
                text-xs
                font-medium
                ${
                  trend === 'down'
                    ? 'bg-red-500/10 text-red-300'
                    : trend === 'up'
                      ? 'bg-emerald-500/10 text-emerald-300'
                      : 'bg-white/10 text-zinc-300'
                }
              `}
            >
              <Trend value={change} trend={trend} />
            </span>
          )}

          {subtitle && <span className="text-xs text-zinc-500">{subtitle}</span>}
        </div>

        {description && (
          <p className="mt-5 max-w-sm text-xs leading-5 text-zinc-500">{description}</p>
        )}
      </div>
    </button>
  )
}

/**
 * ---------------------------------------------------------
 * MAIN KPI COMPONENT
 * ---------------------------------------------------------
 */

export default function KPI({ variant = 'minimal', ...props }) {
  switch (variant) {
    case 'minimal':
      return <MinimalKPI {...props} />

    case 'elevated':
      return <ElevatedKPI {...props} />

    case 'split':
      return <SplitKPI {...props} />

    case 'spotlight':
      return <SpotlightKPI {...props} />

    default:
      return <MinimalKPI {...props} />
  }
}

const kpiPropTypes = {
  title: PropTypes.node,
  value: PropTypes.node,
  subtitle: PropTypes.node,
  change: PropTypes.node,
  trend: PropTypes.oneOf(['up', 'down', 'neutral']),
  icon: PropTypes.elementType,
  iconColor: PropTypes.oneOf(['neutral', 'blue', 'green', 'orange', 'purple', 'red']),
  onClick: PropTypes.func
}

MinimalKPI.propTypes = {
  ...kpiPropTypes,
  footer: PropTypes.node
}

ElevatedKPI.propTypes = {
  ...kpiPropTypes,
  footer: PropTypes.node
}

SplitKPI.propTypes = {
  ...kpiPropTypes,
  progress: PropTypes.number,
  progressLabel: PropTypes.node
}

SpotlightKPI.propTypes = {
  ...kpiPropTypes,
  description: PropTypes.node
}

KPI.propTypes = {
  variant: PropTypes.oneOf(['minimal', 'elevated', 'split', 'spotlight'])
}

export { KPI, MinimalKPI, ElevatedKPI, SplitKPI, SpotlightKPI }
