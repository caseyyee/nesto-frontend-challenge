# Notes

- Inconsistent API response compared to what was documented:

  ```
    1. family:
    - Doc: "VALUE_FLEX" (only)
    - API: "VALUE_FLEX" | "STANDARD"

    2. prepaymentOption:
    - Doc: "STANDARD" | "HELOC"
    - API: "STANDARD" | "ENHANCED"

    3. fixedPenaltySpread:
    - Doc: string (generic)
    - API: "SMALL_PENALTY" | "BANK_PENALTY" (specific enums)

    4. lenderType:
    - Doc: string (generic)
    - API: "MONOLINE" | "BIG_BANK" (specific enums)
  ```
