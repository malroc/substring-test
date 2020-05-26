class User < ApplicationRecord
  has_many :calculations

  validates :email, presence: true, uniqueness: true
  validates :password_confirmation, presence: true

  has_secure_password
end
