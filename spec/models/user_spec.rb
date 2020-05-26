describe User do
  it { is_expected.to have_many :calculations }

  describe "validations" do
    subject { create(:user) }

    it { is_expected.to validate_uniqueness_of :email }

    it { is_expected.to validate_presence_of :email }
    it { is_expected.to validate_presence_of :password_confirmation }
  end

  it { is_expected.to have_secure_password }
end
