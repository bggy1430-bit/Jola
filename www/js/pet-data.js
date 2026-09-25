/* 펫 데이터 */
const PET_GRADES = [
  { grade: 0, name: '일반', color: '#b0b0b0', rate:61.7 },
  { grade: 1, name: '고급', color: '#4caf50', rate:22 },
  { grade: 2, name: '희귀', color: '#2196f3', rate:9 },
  { grade: 3, name: '영웅', color: '#a259ff', rate:4 },
  { grade: 4, name: '전설', color: '#ff9800', rate:0.4 },
  { grade: 5, name: '신화', color: '#ff0055', rate:1.2 },
  { grade: 6, name: '태초', color: '#00eaff', rate:0.7 },
  { grade: 7, name: '절대극', color: '#e84393', rate:0.5 },
  { grade: 8, name: 'ZERO', color: '#00ff99', rate:0.3 },
  { grade: 9, name: 'GOLD', color: '#ffd700', rate:0.2 }
];

/* 펫 프리셋 (오징어 삭제 -> 크리티컬 60% 펫 변경 / 태초, 절대극 펫 추가) */
const PET_PRESETS = [
  {id:'pet_cat',grade:0,name:'점박이 냥이',ic:'🐱',effect:'goldRain',val:18,desc:'몬스터 처치 시 18% 확률로 골드 2배'},
  {id:'pet_chick',grade:0,name:'삐약이',ic:'🐤',effect:'essenceFind',val:20,desc:'몬스터 처치 시 20% 확률로 생명의 정수 +2'},
  {id:'pet_rabbit',grade:0,name:'아기 토끼',ic:'🐰',effect:'secondChanceFixed',val:25,desc:'전투 중 처음 체력이 20% 아래로 내려가면 HP를 최대체력의 25%까지 즉시 복구 (전투당 1회)'},
  {id:'pet_mouse',grade:0,name:'시골 쥐',ic:'🐭',effect:'junkLuck',val:22,desc:'잡템 획득 시 22% 확률로 추가 1개 획득'},
  {id:'pet_dog',grade:1,name:'충직한 댕댕이',ic:'🐶',effect:'firstStrike',val:25,desc:'새로운 몬스터와 전투를 시작한 뒤 첫 번째 공격을 할 때, 플레이어의 기본 공격 피해량이 25% 증가합니다. 이 효과는 직접 피해를 추가하는 것이 아니라 플레이어 기본 공격 자체의 피해량을 증가시키는 효과입니다.'},
  {id:'pet_fox',grade:1,name:'사막여우',ic:'🦊',effect:'crit',val:6,desc:'치명타 확률이 6% 증가합니다. 치명타가 발생했을 때의 피해 계산은 현재 플레이어의 치명타 피해 계산 방식을 그대로 따릅니다.'},
  {id:'pet_sloth',grade:1,name:'나무늘보',ic:'🦥',effect:'guardFixed',val:35,desc:'적의 세 번째 공격을 받을 때마다 그 공격으로 받는 피해가 35% 감소합니다. 적의 공격을 직접 무효화하는 효과가 아니라, 실제로 들어오는 피해량을 감소시키는 방어 효과입니다.'},
  {id:'pet_pig',grade:1,name:'행운의 분홍돈',ic:'🐷',effect:'sellBoost',val:18,desc:'잡동사니 아이템을 판매했을 때 얻는 판매 금액이 18% 증가합니다. 전투 피해에는 직접 영향을 주지 않습니다.'},
  {id:'pet_wolf',grade:2,name:'붉은 갈기 늑대',ic:'🐺',effect:'combo',val:120,desc:'세 번째 플레이어 공격마다 공격력의 120%에 해당하는 피해를 별도의 추가 타격으로 한 번 더 가합니다. 이 추가 타격은 일반 공격 피해와 별도로 계산되며, 스테이지가 바뀌면 공격 횟수가 초기화됩니다.'},
  {id:'pet_turtle',grade:2,name:'철갑 거북',ic:'🐢',effect:'essenceFind',val:12,desc:'모든 적의 공격으로 플레이어가 실제로 받는 피해를 18% 감소시킵니다. 플레이어의 방어력을 직접 올리는 효과와는 별개로, 최종적으로 받는 피해를 줄이는 효과입니다.'},
  {id:'pet_owl',grade:2,name:'지혜의 부엉이',ic:'🦉',effect:'studyExp',val:15,desc:'전투에서 얻는 경험치가 15% 증가합니다. 공격 피해에는 직접 영향을 주지 않습니다.'},
  {id:'pet_panda',grade:2,name:'대나무 판다',ic:'🐼',effect:'lifesteal',val:2,desc:'플레이어가 적에게 피해를 가할 때, 가한 피해량의 2%만큼 플레이어의 체력을 회복합니다. 피해를 추가하는 효과가 아니라 피해량을 기준으로 회복량을 계산하는 효과입니다.'},
  {id:'pet_panther',grade:3,name:'벼락의 흑표범',ic:'🐆',effect:'thunder',val:30,desc:'네 번째 플레이어 공격마다 공격력의 30%에 해당하는 피해를 별도의 추가 타격으로 한 번 더 가합니다. 일반 공격과 별개의 타격으로 처리되며, 스테이지가 바뀌면 공격 횟수가 초기화됩니다.'},
  {id:'pet_dragon_baby',grade:3,name:'화염 아기드래곤',ic:'🐲',effect:'burn',val:24,desc:'공격할 때 24% 확률로 적의 최대 체력 4%에 해당하는 피해를 추가로 가합니다. 이 피해는 적의 최대 체력을 기준으로 계산되며, 보스에게는 최대 체력의 1.5%만 적용됩니다. 플레이어 공격력에 비례하는 일반 피해와는 별도로 계산됩니다.'},
  {id:'pet_lion',grade:3,name:'황금 갈기 사자',ic:'🦁',effect:'bossHunter',val:22,desc:'보스를 공격할 때 플레이어가 가하는 피해가 22% 증가합니다. 일반 몬스터에게는 적용되지 않으며, 별도의 추가 타격을 발생시키는 효과가 아니라 보스 대상 플레이어 피해를 증가시키는 효과입니다.'},
  {id:'pet_eagle',grade:3,name:'천공의 수리',ic:'🦅',effect:'airStrike',val:22,desc:'세 번째 플레이어 공격마다 공격력의 22%에 해당하는 피해를 별도의 추가 타격으로 한 번 더 가합니다. 일반 공격과 따로 계산되며, 스테이지가 바뀌면 공격 횟수가 초기화됩니다.'},
  {id:'pet_frost_mimic',grade:4,name:'빙결 미믹',ic:'🧊',effect:'burn',val:32,desc:'전투에서 처음 받는 적의 공격과 그 이후 여섯 번째 적 공격마다 해당 공격으로 받는 피해가 70% 감소합니다. 공격을 완전히 막는 것이 아니라 해당 공격의 실제 피해량을 크게 줄이는 효과입니다.'},
  {id:'pet_treasure_goblin',grade:4,name:'보물 고블린',ic:'🧌',effect:'bossHunter',val:40,desc:'몬스터를 처치했을 때 18% 확률로 해당 처치에서 얻는 골드가 3배가 됩니다. 전투 피해 계산에는 영향을 주지 않습니다.'},
  {id:'pet_berserk_hamster',grade:4,name:'폭주 햄스터',ic:'🐹',effect:'thunder',val:60,desc:'플레이어의 체력이 최대 체력의 30% 이하가 되면 플레이어의 기본 공격 피해가 18% 증가합니다. 별도의 추가 타격을 만드는 효과가 아니라 기본 공격 피해량을 강화하는 효과입니다.'},
  {id:'pet_mirror_fox',grade:4,name:'거울 여우',ic:'🪞',effect:'airStrike',val:40,desc:'적의 다섯 번째 공격을 받을 때 해당 공격으로 받는 피해가 70% 감소하고, 이어지는 다음 플레이어 공격의 피해가 70% 증가합니다. 두 효과는 각각 받는 피해 감소와 다음 공격 강화로 따로 계산됩니다.'},
  // 신화 — 강력한 상시 능력치 버프. 천공제는 치명타 피해 특화로 변경
  {id:'myth_iron_dragon',grade:5,name:'신화 철룡',ic:'🐲',stat:'atkBonus',effect:'statOnly',val:75,desc:'플레이어의 공격력이 75% 증가합니다. 직접 추가 피해를 발생시키는 능력이 아니라 플레이어의 공격력 능력치를 증가시키는 능력입니다.'}, 

  {id:'myth_world_tree',grade:5,name:'신화 세계수',ic:'🌳',stat:'hpBonus',effect:'statOnly',val:120,desc:'플레이어의 최대 체력이 120% 증가합니다. 최대 체력을 기준으로 계산되는 피해와 회복 효과가 있다면 증가한 최대 체력이 기준이 됩니다.'},
  {id:'myth_sky_emperor',grade:5,name:'신화 천공제',ic:'👑',stat:'critDmg',effect:'statOnly',val:100,desc:'치명타 피해가 100% 증가합니다. 치명타가 발생했을 때 적용되는 피해량을 강화하며, 치명타가 아닌 일반 공격의 피해에는 직접 적용되지 않습니다.'},
  {id:'myth_fate_book',grade:5,name:'신화 운명의 서',ic:'📖',stat:'expBonus',effect:'statOnly',val:80,desc:'전투에서 얻는 경험치가 80% 증가합니다. 전투 피해 계산에는 직접 영향을 주지 않습니다.'},

  // 태초 — 피해 감소/생존 특화 6종
  {id:'origin_meteor',grade:6,name:'태초 운석핵',ic:'☄️',effect:'originMeteorGuard',val:260,desc:'적의 세 번째 공격마다 그 공격으로 받는 피해가 45% 감소합니다. 이 효과는 공격을 막는 것이 아니라 해당 공격의 실제 피해량을 45% 줄입니다.'},

  {id:'origin_chaos',grade:6,name:'태초 혼돈룡',ic:'🐉',effect:'originChaosGuard',val:250,desc:'방어력이 250% 증가합니다. 플레이어 체력이 최대 체력의 50% 이하가 되면 받는 피해가 추가로 40% 감소합니다. 체력 조건이 충족될 때만 추가 감소가 적용됩니다.'},
  {id:'origin_star',grade:6,name:'태초 성운왕',ic:'🌌',effect:'originStarGuard',val:300,desc:'적에게서 받는 모든 피해가 20% 감소합니다. 이 효과는 적의 공격 자체를 없애는 것이 아니라 실제로 받는 피해량을 줄입니다.'},

  // 절대극 — 공격 전용 6종

  {id:'absolute_void',grade:7,name:'절대극 학살자',ic:'🌑',effect:'absSlaughter',val:25,desc:'같은 적을 연속으로 공격할 때마다 직접 가하는 펫 피해가 25%씩 증가하며 최대 10번까지 중첩됩니다. 10중첩에 도달한 뒤 다음 공격에서는 플레이어가 가한 피해의 1000%에 해당하는 추가 펫 피해를 직접 가합니다. 이 추가 피해는 플레이어의 기본 공격과 별도의 피해로 처리됩니다.'},
  {id:'absolute_executioner',grade:7,name:'절대극 처형자',ic:'⚔️',effect:'absExecute',val:1000,desc:'적의 체력이 30% 이하가 되었을 때 플레이어가 가한 피해의 1000%를 별도의 고정 피해로 추가합니다. 이 고정 피해는 공격력 증가, 보스 대상 피해 증가, 펫 피해 증가 등의 추가 배율을 다시 적용받지 않습니다.'},

  {id:'absolute_barrage',grade:7,name:'절대극 폭격자',ic:'🌀',effect:'absBarrage',val:60,desc:'플레이어의 두 번째 공격마다 플레이어가 가한 피해의 60%를 추가 타격으로 여섯 번 발생시킵니다. 각 추가 타격은 원래 공격과 별개의 피해로 계산되며, 한 번의 공격에서 발생한 추가 타격끼리 피해가 합쳐지지 않습니다.'},
  {id:'absolute_crit',grade:7,name:'절대극 파괴신',ic:'🔴',effect:'absDestroy',val:50,desc:'플레이어가 가하는 공격 피해의 50%를 저장합니다. 저장량이 플레이어 최대 체력의 100%에 도달하면 저장된 피해량의 100%를 직접 펫 피해로 한 번에 방출합니다. 최대 저장량을 넘는 피해는 저장되지 않고 버려집니다.'},

  {id:'pet_zero',grade:8,name:'ZERO',ic:'0️⃣',effect:'zeroCombo',val:8,desc:'제로 전용 연속 공격 효과입니다. 첫 번째부터 다섯 번째 공격까지 각각 서로 다른 직접 펫 피해와 회복 효과가 순서대로 발동하며, 적에게 공격받아도 현재 연속 공격 횟수가 끊기지 않습니다. 이 능력으로 발생하는 피해는 일반 플레이어 공격과 별도의 펫 피해로 처리됩니다.'},
  {id:'zero1',grade:8,name:'ZERO1',ic:'⚫',effect:'zeroOne',val:100,desc:'플레이어가 직접 가한 공격만 복제합니다. 첫 번째 복제는 100% 확률로 발생하며 복제 피해는 원래 공격 피해의 70%입니다. 이후 복제가 이어질 때마다 발동 확률이 10%씩 감소합니다. 복제된 공격은 원래 플레이어 공격과 합쳐지지 않고 별도의 펫 피해로 기록됩니다.'}
  ,{id:'alpha_zero',grade:8,name:'ALPHA ZERO',ic:'🔷',effect:'zeroReset',val:1,desc:'치명적인 피해를 처음 받을 때 그 피해를 완전히 무효화하고, 전투가 시작됐을 때의 체력으로 되돌립니다. 동시에 전투 중 적용된 해로운 효과를 제거합니다. 이 효과는 한 전투에서 한 번만 발동합니다.'},
{id:'zero999',grade:8,name:'ZERO999',ic:'⚡',effect:'limitBreak',val:9,desc:'치명적인 피해를 받을 상황이 되면 총 아홉 번의 연속 공격을 가합니다. 첫 번째부터 여덟 번째 공격은 각각 적 최대 체력의 1%와 플레이어 공격력의 10%를 합산해 계산하고, 아홉 번째 공격은 적 최대 체력의 5%와 플레이어 공격력의 300%를 합산해 계산합니다. 최대 체력에 비례하는 피해와 공격력에 비례하는 피해를 함께 사용하는 제로999 전용 공격입니다.'},
{id:'zeroOmega',grade:6,name:'태초 공허왕',ic:'♾️',effect:'zeroOmega',val:40,stat:'hpBonus',statVal:80,levelScale:0,desc:'적에게서 받는 피해의 40%를 확정적으로 흡수해 저장합니다. 다음 일반 공격을 할 때 저장한 피해량의 200%를 직접 펫 피해로 반사합니다. 추가로 플레이어의 최대 체력이 80% 증가합니다. 피해 흡수는 확률에 의존하지 않습니다.'},
{id:'gold_slime',grade:9,name:'골드 슬라임',ic:'🟡',effect:'goldCoin',val:220,desc:'공격할 때마다 금화 스택을 쌓는다. 최대 5중첩, 중첩마다 공격력 +12%. 3번째 공격마다 금화 충격파도 발동하며 처치 시 추가 골드를 준다.'},
{id:'gold_goblin',grade:9,name:'황금 고블린',ic:'👺',effect:'goldPickpocket',val:250,desc:'4번째 공격마다 공격력의 250% 강탈 공격. 스테이지 × 10골드를 즉시 훔친다.'},
{id:'gold_mimic',grade:9,name:'황금 미믹',ic:'📦',effect:'goldJackpot',val:500,desc:'매 공격마다 20% 확률로 공격력의 500% 추가 피해. 발동 공격으로 처치하면 처치 골드가 3배가 된다.'},
{id:'gold_roulette',grade:9,name:'황금 재물룰렛',ic:'🎰',effect:'goldRoulette',val:1,desc:'전투 시작 시 황금 룰렛을 돌린다. 🪙30% / ⚔️25% / 💰대박20% / 💎보물15% / 🔥JACKPOT8% / 💀꽝2%의 결과로 전투 보너스가 결정된다.'}
];

