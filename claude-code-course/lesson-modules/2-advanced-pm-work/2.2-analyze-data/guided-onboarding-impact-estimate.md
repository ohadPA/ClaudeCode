# Impact Estimation: Guided Onboarding with Sample Project

**Author:** Senior PM, Activation Team
**Date:** February 2026
**Status:** For Leadership Review

---

## Feature Summary

**Guided Onboarding** replaces the empty project experience with a pre-populated sample project containing 5-6 example tasks. New users learn by completing example tasks before creating their own.

**Engineering Estimate:** 4 eng-months (~$100,000 fully loaded)

---

## Impact Estimation Framework

```
Impact = Users Affected × Current Action Rate × Expected Lift × Value per Action
```

---

## Current State (from Q4 Usage Data)

| Metric | Value | Source |
|--------|-------|--------|
| New signups/month | 5,000 | Mixpanel |
| Activation rate | 45% | Activation funnel Q4 |
| Activated users/month | 2,250 | Calculated |
| Median time-to-first-completed-task | 45 min | Usage data |
| Conversion to paying customer | 60% | Historical |
| ARPU | $12/month | Revenue data |
| Average customer lifetime | 24 months | Historical |
| LTV per activated user | $172.80 | $12 × 60% × 24 months |

---

## Projected Impact (Realistic Scenario)

### Users Affected

- 5,000 new signups/month
- 70% adoption rate (gradual rollout to new signups only)
- **3,500 users/month exposed to Guided Onboarding**

### Expected Lift

**Current:** 45% activation rate
**Projected:** 58% activation rate (+13 percentage points)

**Reasoning:**
1. 60% of users who create a task never complete it (funnel data)
2. Survey data shows the primary reason is confusion/blank canvas (35% "didn't know what to create")
3. Guided Onboarding directly addresses this confusion by showing examples
4. Conservative estimate: recover 30% of the 60% drop-off
5. Math: 30% recovery × 60% drop-off = 18pp theoretical lift → discounted to 13pp for conservatism

### Business Impact Calculation

| Metric | Current | Projected | Delta |
|--------|---------|-----------|-------|
| Users exposed | 3,500/mo | 3,500/mo | - |
| Activation rate | 45% | 58% | +13pp |
| Activated users/mo | 1,575 | 2,030 | **+455** |
| Paying customers/mo | 945 | 1,218 | +273 |
| Monthly revenue | $11,340 | $14,616 | +$3,276 MRR |
| Annual revenue | $136,080 | $175,392 | **+$39,312 ARR** |

### Long-Term Value

| Metric | Value |
|--------|-------|
| Incremental activated users/month | +455 |
| Annual incremental activated users | +5,460 |
| LTV per activated user | $172.80 |
| **3-year cumulative LTV value** | **$943,296** |

---

## ROI Analysis

| Timeframe | Revenue | Investment | ROI |
|-----------|---------|------------|-----|
| Year 1 | $39,312 ARR | $100,000 | 0.39x |
| Year 2 (cumulative) | $78,624 | $100,000 | 0.79x |
| 3-year LTV | $943,296 | $100,000 | **9.4x** |

**Breakeven:** ~Month 31 on direct revenue basis
**LTV-adjusted breakeven:** Within Year 1 (LTV of first month's incremental users = 455 × $172.80 = $78,624)

---

## Key Assumptions

| Assumption | Value | Confidence | Basis |
|------------|-------|------------|-------|
| Adoption rate | 70% | Medium | Gradual rollout; some users may skip |
| Activation lift | +13pp | Medium | Conservative estimate from survey data |
| Conversion to paid | 60% | High | Consistent historical rate |
| ARPU | $12/mo | High | Current blended average |
| Customer lifetime | 24 months | Medium | Historical average |

---

## Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Lower adoption than expected | Reduces all projections proportionally | Start with 100% rollout to new signups (not opt-in) |
| Sample tasks don't resonate | Users still confused, lower lift | A/B test with multiple task themes by industry |
| Cannibalization of organic activation | Overstates incremental impact | Use control group in A/B test to measure true lift |
| Enterprise users find it patronizing | Negative experience for large teams | Segment by company size; offer "skip" option |

---

## Recommendation

**Proceed to A/B test.** The projected 9.4x 3-year ROI justifies the $100K investment even with significant downside risk. However, single-point estimates hide uncertainty - see scenario analysis for the full range of outcomes.

---

*Analysis based on Q4 usage data (250+ users), activation funnel data (10,000 users), and 800 survey responses.*
