/* 피해 계산 분류/기록 시스템 */
/* =========================================================
   DAMAGE TAXONOMY — 2026-09
   공격/피해증가/피해감소를 서로 다른 계층으로 관리한다.
   피해감소는 오직 적 -> 플레이어 방향에서만 사용한다.
   ========================================================= */
const DAMAGE_TYPES = Object.freeze({
  PLAYER_BASIC:'player_basic',
  PLAYER_CRIT:'player_crit',
  CRIT:'crit',
  MAX_HP_RATIO:'max_hp_ratio',
  CURRENT_HP_RATIO:'current_hp_ratio',
  PET:'pet_damage',
  FIXED:'fixed_damage',
  ARTIFACT:'artifact_damage',
  EXTRA_HIT:'extra_hit'
});
const DAMAGE_INCREASE_TYPES = Object.freeze({
  ATTACK_POWER:'attack_power',
  BOSS_DAMAGE:'boss_damage',
  PET_DAMAGE:'pet_damage_increase'
});
const DAMAGE_REDUCTION_TYPES = Object.freeze({
  RECEIVED_DAMAGE:'received_damage_reduction',
  NULLIFY:'damage_nullify',
  SHIELD:'shield'
});
const DAMAGE_DIRECTION = Object.freeze({
  OUTGOING:'player_to_enemy',
  INCOMING:'enemy_to_player'
});
function ensureDamageLedger(){
  if(!S.damageLedger || typeof S.damageLedger!=='object') S.damageLedger={outgoing:{},incoming:{},lastIncoming:null};
  if(!S.damageLedger.outgoing || typeof S.damageLedger.outgoing!=='object') S.damageLedger.outgoing={};
  if(!S.damageLedger.incoming || typeof S.damageLedger.incoming!=='object') S.damageLedger.incoming={};
}
function recordDamageEvent(direction,type,amount,meta={}){
  amount=Math.max(0,Math.round(Number(amount)||0)); if(!amount)return;
  ensureDamageLedger();
  const bucket=direction===DAMAGE_DIRECTION.INCOMING?S.damageLedger.incoming:S.damageLedger.outgoing;
  bucket[type]=Number(bucket[type]||0)+amount;
  if(direction===DAMAGE_DIRECTION.INCOMING) S.damageLedger.lastIncoming={type,amount,...meta};
}
function recordOutgoingDamageType(type,amount,meta={}){recordDamageEvent(DAMAGE_DIRECTION.OUTGOING,type,amount,meta);}
function recordIncomingDamageType(type,amount,meta={}){recordDamageEvent(DAMAGE_DIRECTION.INCOMING,type,amount,meta);}
function applyReceivedDamageReduction(amount,reductionPct){
  const a=Math.max(0,Number(amount)||0), r=Math.max(0,Math.min(100,Number(reductionPct)||0));
  return Math.max(0,Math.round(a*(1-r/100)));
}
function applyDamageNullify(){return 0;}
function absorbWithShield(amount,shieldAmount){
  const incoming=Math.max(0,Math.round(Number(amount)||0)), shield=Math.max(0,Math.round(Number(shieldAmount)||0));
  const absorbed=Math.min(incoming,shield);
  return {absorbed,remaining:incoming-absorbed};
}
function getDamageTaxonomyReport(){
  ensureDamageLedger();
  return JSON.parse(JSON.stringify({
    attackTypes:DAMAGE_TYPES,
    damageIncreaseTypes:DAMAGE_INCREASE_TYPES,
    damageReductionTypes:DAMAGE_REDUCTION_TYPES,
    outgoing:S.damageLedger.outgoing,
    incoming:S.damageLedger.incoming
  }));
}

