FactoryBot.define do
  factory :user do
    email { FFaker::Internet.email }
    password { FFaker::Lorem.word }
    password_confirmation { password }
  end
end
