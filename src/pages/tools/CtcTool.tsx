import { ToolPageLayout } from "../../components/tools/ToolPageLayout";
import { CtcCalculator } from "../../components/tools/CtcCalculator";
import { toolBySlug } from "../../lib/tools/registry";

export default function CtcTool() {
  return (
    <ToolPageLayout
      tool={toolBySlug("ctc-calculator")!}
      intro={<>Your offer letter says a number in lakhs. Your bank account will say something else. Put in your CTC and see where every rupee goes.</>}
      howItWorks={
        <>
          <p>
            Your CTC is what the company spends on you, not what you take home. The employer's PF and gratuity come
            out first, which gives your gross salary. Then your own PF, professional tax and income tax come out
            of that.
          </p>
          <p>
            Income tax uses the new tax regime for FY 2026-27: a ₹75,000 standard deduction, then the slabs. If your
            taxable income is ₹12 lakh or less, the rebate cancels the tax completely. Just above ₹12 lakh,
            marginal relief means your tax can't be more than your income above ₹12 lakh. Then 4% cess.
          </p>
          <p>
            PF uses the wage ceiling of ₹25,000 a month that applies from 17 September 2026 (it used to be ₹15,000),
            unless you choose PF on your full basic.
          </p>
        </>
      }
    >
      <CtcCalculator />
    </ToolPageLayout>
  );
}
