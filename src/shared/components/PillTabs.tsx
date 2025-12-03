import type { ReactElement } from 'react';

interface TabConfig<T extends string> {
  /** Unique identifier for the tab */
  id: T;
  /** Display label for the tab */
  label: string;
  /** Keyboard shortcut hint */
  shortcut?: string;
}

interface PillTabsProps<T extends string> {
  /** Array of tab configurations */
  tabs: TabConfig<T>[];
  /** Currently active tab ID */
  activeTab: T;
  /** Callback when tab is selected */
  onTabChange: (tabId: T) => void;
  /** Accessible label for the tab navigation */
  ariaLabel?: string;
}

/**
 * PillTabs - A pill-style tab navigation component.
 *
 * Features smooth transitions, keyboard shortcut hints, and
 * proper ARIA attributes for accessibility.
 */
export function PillTabs<T extends string>({
  tabs,
  activeTab,
  onTabChange,
  ariaLabel = 'Tab navigation',
}: PillTabsProps<T>): ReactElement {
  return (
    <div
      className="flex items-center gap-1 p-1 bg-surface-raised rounded-full border border-border-subtle"
      role="tablist"
      aria-label={ariaLabel}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls={`${tab.id}-panel`}
            onClick={() => onTabChange(tab.id)}
            className={`
              relative px-5 py-2 text-xs font-medium rounded-full transition-all duration-300 cursor-pointer
              ${
                isActive
                  ? 'bg-accent text-void shadow-lg shadow-accent/25'
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface-overlay'
              }
            `}
          >
            <span className="relative z-10 flex items-center gap-2">
              {tab.label}
              {tab.shortcut !== undefined && tab.shortcut !== '' ? (
                <kbd
                  className={`
                  px-1.5 py-0.5 text-[10px] rounded border transition-colors
                  ${isActive ? 'border-void/20 text-void/70' : 'border-border text-text-ghost'}
                `}
                >
                  {tab.shortcut}
                </kbd>
              ) : null}
            </span>
          </button>
        );
      })}
    </div>
  );
}
