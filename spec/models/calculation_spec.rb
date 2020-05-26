describe Calculation do
  it { is_expected.to belong_to :user }

  it { is_expected.to validate_presence_of :a }
  it { is_expected.to validate_presence_of :b }

  describe ".non_continuous_substring?" do
    context "when b is a non-continuous substring of a" do
      let(:a) { "abcdefg" }
      let(:b) { "beg" }

      subject { Calculation.non_continuous_substring?(a, b) }

      it { is_expected.to be true }
    end

    context "when b is not a non-continuous substring of a" do
      let(:a) { "abcadebabdeb" }
      let(:b) { "baabbd" }

      subject { Calculation.non_continuous_substring?(a, b) }

      it { is_expected.to be false }
    end
  end
end
