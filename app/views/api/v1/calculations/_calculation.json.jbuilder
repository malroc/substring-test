json.extract! calculation, :a, :b

json.answer(
  if Calculation.non_continuous_substring?(calculation.a, calculation.b)
    "YES"
  else
    "NO"
  end
)
