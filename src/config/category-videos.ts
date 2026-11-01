import type { Locale } from '~/i18n/routing';

export interface CategoryVideoCopy {
  eyebrow: string;
  title: string;
  description: string;
  watchFor: string;
  versionNote: string;
  sourceLabel: string;
}

export interface CategoryVideo {
  videoId: string;
  sourceUrl: string;
  copy: Record<Locale, CategoryVideoCopy>;
}

export const CATEGORY_VIDEOS: Record<string, CategoryVideo> = {
  guides: {
    videoId: 'DiOdZUUMqPU',
    sourceUrl: 'https://www.youtube.com/watch?v=DiOdZUUMqPU',
    copy: {
      en: {
        eyebrow: 'Demo field guide',
        title: 'See the current Emberville gameplay loop first',
        description:
          'This independent demo overview connects the prison opening, combat, progression, classes, and planned town systems before you choose a detailed guide.',
        watchFor:
          'Watch for the transition from basic combat into mastery and class progression, then use our dated guides to verify anything that may have changed.',
        versionNote:
          'Recorded from the October 2026 public demo. The October 27 release date mentioned in the video is obsolete; PC Early Access is now targeted for January 7, 2027.',
        sourceLabel: 'Mortismal Gaming — public demo overview',
      },
      zh: {
        eyebrow: '试玩版入门',
        title: '先了解 Emberville 当前的核心循环',
        description:
          '这段独立试玩概览把监狱开局、战斗、成长、职业与规划中的城镇系统串联起来，适合在阅读详细攻略前建立整体认识。',
        watchFor:
          '重点观察基础战斗如何过渡到熟练度和职业成长；可能随版本变化的细节请以本站带日期的攻略为准。',
        versionNote:
          '视频基于 2026 年 10 月公开 Demo。视频提到的 10 月 27 日发售日期已经作废；当前 PC 抢先体验目标为 2027 年 1 月 7 日。',
        sourceLabel: 'Mortismal Gaming — 公开 Demo 概览',
      },
    },
  },
  classes: {
    videoId: 'uBUp4Eblqpc',
    sourceUrl: 'https://www.youtube.com/watch?v=uBUp4Eblqpc',
    copy: {
      en: {
        eyebrow: 'Official gameplay footage',
        title: 'Watch classes and combat styles in motion',
        description:
          'The official MIX gameplay reel shows how weapons, movement, attacks, and class-flavoured abilities read during real encounters.',
        watchFor:
          'Compare melee, ranged, and magic presentation; the video demonstrates the feel of combat but does not confirm a final class roster or balance values.',
        versionNote:
          'Official pre-release footage published March 9, 2026. Treat names, values, and availability as version-sensitive until verified in the current build.',
        sourceLabel: 'Emberville official YouTube — The MIX gameplay',
      },
      zh: {
        eyebrow: '官方实机画面',
        title: '实际观察职业与战斗风格',
        description: '官方 MIX 实机视频展示了武器、移动、攻击与职业特色技能在战斗中的表现。',
        watchFor:
          '对比近战、远程和魔法的操作表现；视频可以说明战斗风格，但不能证明最终职业名单或平衡数值。',
        versionNote:
          '官方于 2026 年 3 月 9 日发布的发售前画面。职业名称、数值和可用状态仍需按当前版本核实。',
        sourceLabel: 'Emberville 官方 YouTube — The MIX 实机',
      },
    },
  },
  skills: {
    videoId: 'hPsCEHnjBJc',
    sourceUrl: 'https://www.youtube.com/watch?v=hPsCEHnjBJc',
    copy: {
      en: {
        eyebrow: 'Official announcement footage',
        title: 'See how abilities support different fighting styles',
        description:
          'The official announcement trailer provides a compact visual reference for combat abilities, weapons, movement, and the game’s dungeon encounters.',
        watchFor:
          'Use the footage to recognise ability roles and presentation, not as proof of exact damage, Kymia cost, cooldown, unlock level, or final balance.',
        versionNote:
          'Official pre-release footage. This database keeps exact values hidden until they are independently verified for a named build.',
        sourceLabel: 'Emberville official YouTube — announcement trailer',
      },
      zh: {
        eyebrow: '官方公布画面',
        title: '观察技能如何构成不同战斗风格',
        description:
          '官方公布预告片集中展示了战斗技能、武器、移动和地下城遭遇，可作为技能表现的视觉参考。',
        watchFor:
          '视频可用于辨认技能定位和表现，不能作为伤害、Kymia 消耗、冷却、解锁等级或最终平衡的证据。',
        versionNote: '官方发售前画面。本站只会在对应版本获得独立验证后发布精确数值。',
        sourceLabel: 'Emberville 官方 YouTube — 公布预告片',
      },
    },
  },
  mechanics: {
    videoId: 'BKW4LQdC0U8',
    sourceUrl: 'https://www.youtube.com/watch?v=BKW4LQdC0U8',
    copy: {
      en: {
        eyebrow: 'Official systems overview',
        title: 'See exploration, crafting, and rebuilding connect',
        description:
          'This official trailer shows the wider loop: explore dangerous regions, gather materials, craft, develop the estate, and rebuild Emberville.',
        watchFor:
          'Focus on how expedition rewards feed production and town progress; a shown feature does not establish its exact unlock order, recipe, or current demo availability.',
        versionNote:
          'Official July 2026 trailer. Its October 27 release date was later replaced by the January 7, 2027 PC Early Access target.',
        sourceLabel: 'Emberville official media — release-date gameplay trailer',
      },
      zh: {
        eyebrow: '官方系统概览',
        title: '观察探索、制作与重建如何连接',
        description:
          '官方预告片展示了更完整的循环：探索危险区域、收集材料、制作物品、建设 Estate 并重建 Emberville。',
        watchFor:
          '重点观察远征收益如何支持生产和城镇成长；画面出现某项功能不代表其解锁顺序、配方或 Demo 可用状态已经确认。',
        versionNote:
          '官方 2026 年 7 月预告片。片中的 10 月 27 日日期后来已被 2027 年 1 月 7 日 PC 抢先体验目标取代。',
        sourceLabel: 'Emberville 官方媒体 — 发售日实机预告片',
      },
    },
  },
  bosses: {
    videoId: 'WHkn3hpg5C8',
    sourceUrl: 'https://www.youtube.com/watch?v=WHkn3hpg5C8',
    copy: {
      en: {
        eyebrow: 'Version-labeled walkthrough footage',
        title: 'Study the Spider Matriarch encounter',
        description:
          'This long-form pre-release playthrough includes the opening Vitromotus route and the Spider Matriarch fight, giving the boss guide a visual reference.',
        watchFor:
          'Watch positioning, adds, arena hazards, and safe attack windows; confirm current mechanics in your build before copying any exact route or loadout.',
        versionNote:
          'Creator footage from a pre-release build. Encounter behaviour, rewards, and route details may differ from the current public demo or Early Access build.',
        sourceLabel: 'CohhCarnage — Emberville prologue playthrough',
      },
      zh: {
        eyebrow: '标注版本的流程视频',
        title: '观察 Spider Matriarch Boss 战',
        description:
          '这段发售前长流程包含 Vitromotus 开局路线和 Spider Matriarch 战斗，可为 Boss 攻略提供画面参考。',
        watchFor:
          '重点观察走位、小怪、场地威胁与安全输出窗口；精确路线和装备选择仍需在当前版本中确认。',
        versionNote:
          '创作者录制的发售前版本画面。Boss 行为、奖励和路线细节可能与当前 Demo 或抢先体验版本不同。',
        sourceLabel: 'CohhCarnage — Emberville 序章流程',
      },
    },
  },
};

export function getCategoryVideo(category: string, locale: Locale): CategoryVideo | undefined {
  const video = CATEGORY_VIDEOS[category];
  if (!video) return undefined;
  return video.copy[locale] ? video : undefined;
}
