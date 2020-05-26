class Calculation < ApplicationRecord
  belongs_to :user

  validates :a, presence: true
  validates :b, presence: true

  def self.non_continuous_substring?(a, b)
    rem = a
    res = true

    b.chars.each do |ch|
      partition = rem.partition(ch)

      if partition[1].present?
        rem = partition[2]
      else
        res = false
        break
      end
    end

    res
  end
end
