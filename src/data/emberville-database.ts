export type EvidenceStatus = 'official' | 'demo-observed' | 'pending';
export type SkillType = 'active' | 'passive';
export type ClassKey = 'knight' | 'mage' | 'wanderer' | 'archer';

interface EvidenceMetadata {
  status: EvidenceStatus;
  gameVersion: string;
  lastVerified: string;
  sourceLabel: string;
}

export interface EmbervilleClass extends EvidenceMetadata {
  key: ClassKey;
  name: string;
  availability: string;
  playstyle: string;
}

export interface EmbervilleSkill extends EvidenceMetadata {
  id: string;
  name: string;
  classKey: Exclude<ClassKey, 'archer'>;
  type: SkillType;
  purpose: string;
}

const demoEvidence = {
  status: 'demo-observed' as const,
  gameVersion: 'Steam Next Fest Demo',
  lastVerified: '2026-10-30',
  sourceLabel: 'Steam Next Fest demo observation',
};

export const EMBERVILLE_CLASSES: EmbervilleClass[] = [
  {
    key: 'knight',
    name: 'Knight',
    availability: 'Playable in the Steam Next Fest demo',
    playstyle: 'Close-range offense, blocking, counterattacks, control, and defensive tools.',
    ...demoEvidence,
  },
  {
    key: 'mage',
    name: 'Mage',
    availability: 'Playable in the Steam Next Fest demo',
    playstyle: 'Ranged Kymia attacks, area pressure, resource recovery, and summoned support.',
    ...demoEvidence,
  },
  {
    key: 'wanderer',
    name: 'Wanderer',
    availability: 'Playable in the Steam Next Fest demo',
    playstyle: 'Mobility, recovery, gathering support, and adaptable early-game utility.',
    ...demoEvidence,
  },
  {
    key: 'archer',
    name: 'Archer',
    availability: 'Shown or referenced, but not playable in the verified demo snapshot',
    playstyle: 'A ranged class associated with control and poison; final details remain unconfirmed.',
    status: 'pending',
    gameVersion: 'Pre-Early Access',
    lastVerified: '2026-10-30',
    sourceLabel: 'Pre-release reference; awaiting playable verification',
  },
];

const skill = (
  id: string,
  name: string,
  classKey: EmbervilleSkill['classKey'],
  type: SkillType,
  purpose: string,
  status: EvidenceStatus = 'demo-observed',
): EmbervilleSkill => ({
  id,
  name,
  classKey,
  type,
  purpose,
  status,
  gameVersion: 'Steam Next Fest Demo',
  lastVerified: '2026-10-30',
  sourceLabel:
    status === 'pending'
      ? 'Demo data reference; in-game name or behavior awaits confirmation'
      : 'Steam Next Fest demo observation',
});

export const EMBERVILLE_SKILLS: EmbervilleSkill[] = [
  skill('knight-breakthrough', 'Breakthrough', 'knight', 'active', 'A forward charge used to damage and push enemies.'),
  skill('knight-counter-strike', 'Counter Strike', 'knight', 'active', 'A reactive tool centered on counterattacking incoming hits.'),
  skill('knight-fortify', 'Fortify', 'knight', 'active', 'A defensive stance that improves survivability while maintained.'),
  skill('knight-defiance-shout', 'Defiance Shout [待复核]', 'knight', 'active', 'A taunt-style ability whose final in-game name remains unconfirmed.', 'pending'),
  skill('knight-momentum', 'Momentum', 'knight', 'passive', 'Rewards successful counterattacks with faster follow-up pressure.'),
  skill('knight-breakthrough-plus', 'Breakthrough+', 'knight', 'active', 'An upgrade branch that improves Breakthrough mobility.'),
  skill('knight-counter-strike-plus', 'Counter Strike+', 'knight', 'active', 'An upgrade branch that strengthens successful counterattacks.'),
  skill('knight-defiance-shout-plus', 'Defiance Shout+ [待复核]', 'knight', 'active', 'An unconfirmed upgrade branch associated with the taunt ability.', 'pending'),
  skill('knight-shield-bash-plus', 'Shield Bash+', 'knight', 'active', 'An upgrade branch that adds vulnerability pressure to Shield Bash.'),
  skill('knight-crushing-stomp-control', 'Crushing Stomp (Control)', 'knight', 'active', 'A close-range control option used to stun nearby enemies.'),
  skill('knight-morale-boost', 'Morale Boost', 'knight', 'passive', 'Turns successful blocks into improved ability availability.'),
  skill('knight-guard-stance', 'Guard Stance', 'knight', 'active', 'A temporary blocking-focused defensive stance.'),
  skill('knight-shield-bash', 'Shield Bash', 'knight', 'active', 'A sweeping shield attack with strong knockback utility.'),
  skill('knight-last-stride', 'Last Stride', 'knight', 'passive', 'Supports pursuit by improving movement toward weakened enemies.'),
  skill('knight-shattered-defense', 'Shattered Defense', 'knight', 'passive', 'Rewards attacks made against stunned targets.'),
  skill('knight-valiant-heart', 'Valiant Heart', 'knight', 'passive', 'A low-health survival effect with version-sensitive behavior.'),
  skill('knight-crushing-stomp-upgrade', 'Crushing Stomp (Upgrade)', 'knight', 'active', 'A progression branch that improves the stomp control effect.'),

  skill('mage-curse', 'Curse', 'mage', 'passive', 'Applies a delayed magical effect as enemies take magic damage.'),
  skill('mage-death-wish', 'Death Wish', 'mage', 'passive', 'Restores Kymia after defeating enemies.'),
  skill('mage-void-trail-plus', 'Void Trail+', 'mage', 'active', 'An upgrade branch that adds slowing utility to Void Trail.'),
  skill('mage-kymia-surge-plus', 'Kymia Surge+', 'mage', 'active', 'An upgrade branch that rewards charging the Kymia beam.'),
  skill('mage-missile-barrage-plus', 'Missile Barrage+ [待复核]', 'mage', 'active', 'A projectile-damage upgrade whose displayed demo name needs confirmation.', 'pending'),
  skill('mage-arcane-blast-plus', 'Arcane Blast+', 'mage', 'active', 'An upgrade branch that changes Arcane Blast range and spread.'),
  skill('mage-soul-wisp-plus', 'Soul Wisp+', 'mage', 'active', 'An upgrade branch that changes the summoned wisp into longer support.'),
  skill('mage-kymia-siphon', 'Kymia Siphon', 'mage', 'active', 'Recovers Kymia for continued spell use.'),
  skill('mage-kymia-regeneration', 'Kymia Regeneration', 'mage', 'active', 'Improves Kymia recovery while the effect is maintained.'),
  skill('mage-void-trail', 'Void Trail', 'mage', 'active', 'Leaves a damaging magical path behind the player.'),
  skill('mage-kymia-surge', 'Kymia Surge', 'mage', 'active', 'Channels Kymia into a sustained beam attack.'),
  skill('mage-missile-barrage', 'Missile Barrage', 'mage', 'active', 'Fires a burst of magical projectiles.'),
  skill('mage-arcane-blast', 'Arcane Blast', 'mage', 'active', 'Creates a spreading close-range magical blast.'),
  skill('mage-soul-wisp', 'Soul Wisp', 'mage', 'active', 'Summons a wisp that follows the player and attacks nearby enemies.'),
  skill('mage-kymia-overflow', 'Kymia Overflow', 'mage', 'passive', 'Expands the Mage resource pool.'),
  skill('mage-synergy', 'Synergy', 'mage', 'passive', 'Rewards fighting while a Soul Wisp is active.'),
  skill('mage-warcaster', 'Warcaster', 'mage', 'passive', 'Supports spell damage when fighting groups at close range.'),

  skill('wanderer-explorers-leap', "Explorer's Leap", 'wanderer', 'passive', 'Improves dash mobility for exploration and repositioning.'),
  skill('wanderer-focused-strike', 'Focused Strike', 'wanderer', 'active', 'A direct forward attack built around a focused hit.'),
  skill('wanderer-focused-strike-plus', 'Focused Strike+', 'wanderer', 'active', 'An upgrade branch that improves Focused Strike reliability.'),
  skill('wanderer-foragers-instinct', "Forager's Instinct", 'wanderer', 'passive', 'Supports gathering and material acquisition.'),
  skill('wanderer-kymia-recovery', 'Kymia Recovery', 'wanderer', 'active', 'Restores Kymia during exploration or combat downtime.'),
  skill('wanderer-restoration-aura', 'Restoration Aura', 'wanderer', 'active', 'Creates a short recovery effect around the player.'),
  skill('wanderer-lucky-charm', 'Lucky Charm', 'wanderer', 'active', 'Temporarily improves the character luck-related stat.'),
  skill('wanderer-nomads-step', "Nomad's Step", 'wanderer', 'passive', 'Reduces the impact of environmental hazards and traps.'),
  skill('wanderer-swift-foot', 'Swift Foot', 'wanderer', 'active', 'Maintains improved movement speed in exchange for reserved Kymia.'),
  skill('wanderer-swift-foot-plus', 'Swift Foot+', 'wanderer', 'active', 'An upgrade branch that improves Swift Foot movement.'),
  skill('wanderer-restoration-aura-plus', 'Restoration Aura+', 'wanderer', 'active', 'An upgrade branch that expands the recovery effect.'),
  skill('wanderer-kymia-recovery-plus', 'Kymia Recovery+', 'wanderer', 'active', 'An upgrade branch that improves Kymia Recovery availability.'),
  skill('wanderer-second-wind', 'Second Wind', 'wanderer', 'active', 'Refreshes dash availability for emergency repositioning.'),
];

export interface SkillFilters {
  classKey?: EmbervilleSkill['classKey'] | 'all';
  type?: SkillType | 'all';
  status?: EvidenceStatus | 'all';
  query?: string;
}

export function filterSkills(skills: EmbervilleSkill[], filters: SkillFilters): EmbervilleSkill[] {
  const query = filters.query?.trim().toLowerCase() ?? '';
  return skills.filter((entry) => {
    if (filters.classKey && filters.classKey !== 'all' && entry.classKey !== filters.classKey) return false;
    if (filters.type && filters.type !== 'all' && entry.type !== filters.type) return false;
    if (filters.status && filters.status !== 'all' && entry.status !== filters.status) return false;
    if (query && !`${entry.name} ${entry.purpose}`.toLowerCase().includes(query)) return false;
    return true;
  });
}
