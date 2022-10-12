def sum_all_numbers(number):
  if number > 1: # condition of function execution
    return number + sum_all_numbers(number-1)
  else: return 1 # 'emrgency exit' for summing 0 or negative values

print("Calling sum_all_numbers(4), and obtain: ", sum_all_numbers(4))