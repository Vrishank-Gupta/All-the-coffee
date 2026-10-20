import { Link } from "react-router-dom";

export default function GstReconciliationAi() {
  return (
    <>
      <p>
        It's the 15th. GSTR-2B landed yesterday, your purchase register has 430 rows, and the 2B download has
        412. Somewhere in that gap of 18 is a vendor who typed your GSTIN wrong, a supplier who hasn't filed yet,
        and at least one invoice your own team entered as "INV/0045" when the vendor called it "45/25-26." You
        have Ctrl+F, a cold cup of chai, and a GSTR-3B due date that does not care how your week is going.
      </p>
      <p>
        AI can genuinely help here. It can also confidently help you claim credit you shouldn't. This post is
        about telling the two apart: what GSTR-2B matching involves, where AI saves real hours, and the parts that
        must stay with you and your CA.
      </p>
      <p>
        <em>
          A quick note: this is general information for finance and accounts teams, not tax advice. GST rules and
          portal features change often. For any decision about what credit to claim or reverse, check the current
          rules on the GST portal and speak to your CA.
        </em>
      </p>

      <h2>GSTR-2B in plain language</h2>
      <p>
        <strong>Input tax credit (ITC)</strong> is the GST you paid on purchases, which you can usually set off
        against the GST you owe on sales. <strong>GSTR-2B</strong> is the government's statement of which of
        those purchase invoices your suppliers have actually reported.
      </p>
      <p>
        The{" "}
        <a
          href="https://tutorial.gst.gov.in/userguide/returns/FAQ_gstr2b.htm"
          target="_blank"
          rel="noopener noreferrer"
        >
          GST portal's own FAQ
        </a>{" "}
        calls it "a read-only static auto-drafted ITC statement." In plain words:
      </p>
      <ul>
        <li>
          <strong>Auto-drafted:</strong> the portal builds it from what your suppliers file (mainly in GSTR-1 or
          IFF, the quarterly filers' invoice upload facility), plus imports data from customs (ICEGATE) and a few
          other sources.
        </li>
        <li>
          <strong>Static:</strong> once generated for a period, it doesn't keep changing every time a supplier
          files late, unlike GSTR-2A, which updates as suppliers file.
        </li>
        <li>
          <strong>Monthly:</strong> for monthly filers, it is generated on the 14th of the following month. For
          quarterly filers, it's on the 14th of the month after the quarter ends.
        </li>
      </ul>
      <p>
        You don't file GSTR-2B. You use it to work out the ITC you report in <strong>GSTR-3B</strong>, the
        monthly (or quarterly) summary return where you actually pay tax and claim credit.
      </p>

      <h2>Why 2B matters so much: the law ties your credit to it</h2>
      <p>
        Since January 1, 2022, you generally can't claim ITC on an invoice your supplier hasn't reported. Section
        16(2)(aa) of the CGST Act and the substituted Rule 36(4) of the CGST Rules make ITC available only when
        the supplier has furnished the invoice in GSTR-1 or IFF and it has been communicated to you in GSTR-2B (
        <a
          href="https://taxguru.in/goods-and-service-tax/claim-itc-gstr-2b-mandatory-w-e-f-01-01-2022.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          TaxGuru explains the notifications and dates
        </a>
        ). Before that, there was some room for "provisional" credit. Now there basically isn't.
      </p>
      <p>
        There's also a deadline. Under Section 16(4), credit for a financial year has a cut-off (the{" "}
        <a
          href="https://tutorial.gst.gov.in/downloads/news/final_faqs_on_ims_22_09_2024.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          GSTN's IMS FAQ
        </a>{" "}
        refers to the 30th November deadline for availing ITC). An invoice that your supplier only reports after
        that window can be lost for good. This is why "we'll sort it out later" is an expensive habit.
      </p>

      <h2>What the Invoice Management System (IMS) changed</h2>
      <p>
        Until late 2024, 2B was something that happened to you. The{" "}
        <strong>Invoice Management System (IMS)</strong> gave you a say. According to the{" "}
        <a
          href="https://tutorial.gst.gov.in/downloads/news/final_faqs_on_ims_22_09_2024.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          GSTN's IMS FAQ
        </a>
        , IMS went live on the portal from October 1, 2024, with recipients able to act on invoices from October
        14, 2024. Here's how it works now:
      </p>
      <ul>
        <li>
          As soon as a supplier saves an invoice in GSTR-1, GSTR-1A or IFF, it appears in your IMS dashboard.
        </li>
        <li>
          You can <strong>Accept</strong>, <strong>Reject</strong> or keep it <strong>Pending</strong>.
        </li>
        <li>
          Accepted invoices go into the "ITC Available" part of 2B and auto-fill into GSTR-3B. Rejected ones go
          into "ITC Rejected" and don't. Pending ones stay out of 2B for now.
        </li>
        <li>
          <strong>If you do nothing, the invoice is "deemed accepted"</strong> when 2B is generated. Silence
          counts as yes.
        </li>
        <li>
          2B is still generated on the 14th, but it's now treated as a draft. You can keep acting on records until
          you file GSTR-3B, and if you change anything after the 14th, you must "recompute" 2B before filing.
        </li>
        <li>
          Some records skip IMS and go straight into 2B, including reverse charge (RCM) invoices and imports.
        </li>
      </ul>
      <p>Two updates since then are worth knowing:</p>
      <ul>
        <li>
          <strong>October 2025 tax period onward:</strong> a{" "}
          <a
            href="https://www.mahagst.gov.in/public/uploads/gstnadvisory/1760528794_371%20Advisory%20New%20Changes%20in%20Invoice%20Management%20System%20(IMS).pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            GSTN advisory dated September 23, 2025
          </a>{" "}
          allowed certain credit notes and amendments to be kept pending for one tax period, and let you declare
          how much ITC actually needs to be reduced (useful when you never claimed, or only partly claimed, the
          original credit). GSTN also{" "}
          <a
            href="https://www.mahagst.gov.in/public/uploads/gstnadvisory/1768890416_375%20Attention%20%20Important%20Advisory%20on%20IMS.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            clarified on October 8, 2025
          </a>{" "}
          that ITC still auto-populates from 2B into 3B and 2B is still generated automatically on the 14th,
          after rumours on social media said otherwise.
        </li>
        <li>
          <strong>April 2026:</strong> GSTN released an{" "}
          <a
            href="https://tutorial.gst.gov.in/downloads/news/advisory_on_ims_offline_tool_23rd_april_2026.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Excel-based IMS Offline Tool
          </a>{" "}
          so you can take accept, reject or pending actions in bulk, with remarks, and upload them back to the
          portal.
        </li>
      </ul>
      <p>
        One important point from a{" "}
        <a
          href="https://taxguru.in/goods-and-service-tax/gst-ims-september-2026-credit-note-pending-rules-gstr-2b-itc-reversal-controls.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          TaxGuru analysis from October 2026
        </a>
        : accepting an invoice in IMS "does not override section 16 or section 17." Blocked credits (Section
        17(5) items) and other eligibility rules still apply. IMS tells the portal which invoices you're
        processing. It doesn't decide whether you're entitled to the credit.
      </p>
      <p>
        The practical effect: reconciliation is no longer a month-end chore you do after 2B arrives. You need to
        compare your books with what's sitting in IMS <em>before</em> the 14th, or at least before you file 3B.
      </p>

      <h2>The actual reconciliation problem</h2>
      <p>
        On paper, it's simple: every purchase invoice in your books should appear in 2B, with the same GSTIN,
        number, date and amounts. In practice, the two lists rarely agree, and most of the mismatches are boring.
      </p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Type of mismatch</th>
              <th>What it looks like</th>
              <th>Usually means</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Invoice number format</td>
              <td>"INV/0045" in your books, "45/25-26" in 2B</td>
              <td>Same invoice, typed differently</td>
            </tr>
            <tr>
              <td>GSTIN typo</td>
              <td>One character off, often on your side or the vendor's</td>
              <td>Wrong data entry; if the vendor got your GSTIN wrong, it may not appear in your 2B at all</td>
            </tr>
            <tr>
              <td>Date difference</td>
              <td>You booked it on receipt date; the vendor reported invoice date</td>
              <td>Same invoice, may fall in a different month's 2B</td>
            </tr>
            <tr>
              <td>Missing in 2B</td>
              <td>In your books, nowhere in 2B</td>
              <td>Supplier hasn't filed, filed late, or filed under the wrong GSTIN</td>
            </tr>
            <tr>
              <td>Missing in books</td>
              <td>In 2B, not in your books</td>
              <td>Invoice not yet booked, or an invoice you never received (worth investigating)</td>
            </tr>
            <tr>
              <td>Small amount difference</td>
              <td>₹18,000.00 vs ₹18,000.40</td>
              <td>Rounding, often harmless</td>
            </tr>
            <tr>
              <td>Large amount or tax split difference</td>
              <td>IGST in 2B, CGST + SGST in your books</td>
              <td>Place of supply or data entry issue; needs a closer look</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Most of the time goes into the first three rows, which are the same invoice wearing a different outfit.
        That's exactly the kind of tedious pattern-matching where AI is useful.
      </p>

      <h2>Before AI: the free tools you may already have</h2>
      <p>
        It's worth knowing that GSTN itself offers a{" "}
        <a
          href="https://tutorial.gst.gov.in/downloads/matchingtool.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          Matching Offline Tool
        </a>{" "}
        (under Downloads, then Offline Tools, on the GST portal). You import your 2B and a purchase register in
        its template, and it sorts records into exact matches and "probable" matches, with tolerance settings you
        can adjust. Many accounting software packages also include 2B reconciliation. If one of these already
        works for your volume, use it.
      </p>
      <p>
        Where AI comes in is the gap around those tools: your register isn't in their template, your vendors'
        numbering is chaotic, or you want to understand and act on the mismatches rather than just list them.
        (Interestingly, the Institute of Chartered Accountants of India's AI portal features a{" "}
        <a
          href="https://ai.icai.org/usecases_details.php?id=152"
          target="_blank"
          rel="noopener noreferrer"
        >
          member-built GSTR-2B reconciliation tool from an ICAI AI hackathon
        </a>{" "}
        that uses exact, partial and fuzzy matching. We mention it as a sign of where the profession is heading,
        not as a recommendation.)
      </p>

      <h2>What AI can do well</h2>
      <h3>1. Write the formulas you'd otherwise fight with</h3>
      <p>
        Describe your two sheets in plain English and ask for the formula. For example: "Sheet Books has GSTIN in
        column B and invoice number in column C. Sheet 2B has the same in columns A and D. Write a formula that
        shows Found or Not found for each row in Books, matching on both GSTIN and invoice number." You'll get a
        working XLOOKUP or COUNTIFS, and you can ask it to explain each part.
      </p>
      <h3>2. Walk you through Power Query</h3>
      <p>
        <strong>Power Query</strong> is the "Get &amp; Transform Data" feature in Excel that lets you record
        cleanup steps once and replay them every month. AI is good at giving you the click-by-click steps: trim
        spaces, make text uppercase, split a column, merge two tables. Next month, you just hit Refresh.
      </p>
      <h3>3. Normalise invoice numbers (fuzzy matching)</h3>
      <p>
        <strong>Fuzzy matching</strong> means finding records that are probably the same even if they aren't
        identical. For invoice numbers, the usual trick is to create a "clean" version on both sides: remove
        spaces, slashes, hyphens and common prefixes like "INV," strip leading zeros, and drop financial-year
        suffixes like "25-26." Then "INV/0045" and "45/25-26" both become "45," and they match. AI can write the
        formula or steps for this, and suggest which rules make sense for your vendors.
      </p>
      <p>
        One caution: always match on GSTIN <em>and</em> the cleaned number together. Plenty of vendors have an
        invoice "45."
      </p>
      <h3>4. Flag likely GSTIN typos</h3>
      <p>
        A GSTIN is 15 characters, and characters 3 to 12 are the supplier's PAN. AI can help you build a check
        that flags GSTINs in your books that differ from a 2B GSTIN by just one or two characters, or that have
        the right PAN but a different state code. Those are your "probably a typo, go verify" list.
      </p>
      <h3>5. Explain mismatches and draft the follow-ups</h3>
      <p>
        Once you have a list, AI is useful for turning it into action: a plain-English summary for your manager,
        and polite, specific emails or WhatsApp messages to vendors ("Our records show invoice 45 dated 3
        September for ₹1,18,000. It hasn't appeared in our GSTR-2B. Could you check whether it was filed under
        GSTIN ending ...?").
      </p>
      <h3>6. Build a small matching tool from a description</h3>
      <p>
        If you do this every month, you can go one step further: describe the whole process to an AI and have it
        build you a small browser-based tool. You upload two CSV files, and it shows matched, probable and
        unmatched rows with the reason. This is sometimes called "vibe coding": building software by describing
        what you want instead of writing code. There's a sample prompt below.
      </p>

      <h2>What AI must not do</h2>
      <p>Draw these lines clearly, for yourself and your team:</p>
      <ul>
        <li>
          <strong>It does not decide ITC eligibility.</strong> Whether a credit is blocked under Section 17(5),
          needs reversal under Rule 37A (where the supplier hasn't paid the tax), or should be apportioned for
          exempt supplies is a judgement call based on law and facts. A chatbot's guess is not a position you can
          defend in a notice reply.
        </li>
        <li>
          <strong>It does not accept or reject invoices in IMS for you.</strong> Remember, "no action" means
          deemed accepted. A human should decide on each disputed record.
        </li>
        <li>
          <strong>It does not file anything.</strong> GSTR-3B is filed by an authorised person who has checked
          the numbers.
        </li>
        <li>
          <strong>It is not a source of current GST law.</strong> AI tools can be out of date or simply wrong
          about rules, rates and deadlines. Check the GST portal, CBIC and your CA.
        </li>
      </ul>
      <p>
        Think of AI as a very fast junior who's great at sorting and drafting but has never read the CGST Act
        properly. Useful, but you sign off. Our piece on{" "}
        <Link to="/blog/ai-cant-do-your-job-yet">why AI can't do your job yet</Link> explains why this checking
        role is the part of finance work that matters more now, not less.
      </p>

      <h2>A data caution before you paste anything</h2>
      <p>
        GSTINs, vendor names, invoice values and your purchase register are business data. Some of it may also
        identify individuals (sole proprietors, for example). Before you paste any of it into an AI tool:
      </p>
      <ul>
        <li>Use only AI tools your company has approved for work data.</li>
        <li>
          When you're just figuring out the formula or method, use made-up sample rows. AI doesn't need your real
          vendors to write a COUNTIFS.
        </li>
        <li>
          If you must work with real data in an unapproved tool, don't. If it's an approved tool, consider
          replacing vendor names with codes ("V001") and masking GSTINs where the logic doesn't need them.
        </li>
        <li>
          A tool that runs in your browser on files you load locally, like the one in the prompt below, can be
          built and tested with dummy data before you ever point it at real files.
        </li>
      </ul>
      <p>
        For more on this, see our guide to{" "}
        <Link to="/blog/ai-data-privacy-india">what's safe to paste into AI under India's DPDP law</Link> and our
        piece on <Link to="/blog/shadow-ai-your-team">shadow AI in teams</Link>.
      </p>

      <h2>A step-by-step approach that works</h2>
      <ol>
        <li>
          <strong>Get both lists out.</strong> Export your purchase register from your accounting software, and
          download IMS or 2B data from the portal in Excel.
        </li>
        <li>
          <strong>Line up the columns.</strong> You need, at minimum: supplier GSTIN, invoice number, invoice
          date, taxable value, IGST, CGST, SGST. Same headers on both sheets makes life easier.
        </li>
        <li>
          <strong>Clean once, reuse monthly.</strong> Use AI to write Power Query steps or formulas that trim
          spaces, uppercase GSTINs and create a cleaned invoice number column.
        </li>
        <li>
          <strong>Match in passes.</strong> First, exact match on GSTIN plus invoice number. Then match on GSTIN
          plus cleaned number. Then flag near-miss GSTINs. Each pass shrinks the unmatched pile.
        </li>
        <li>
          <strong>Compare amounts on matched rows.</strong> Set a tolerance (say, ₹1) for rounding, and flag
          anything bigger, plus any IGST vs CGST/SGST swap.
        </li>
        <li>
          <strong>Sort what's left.</strong> "In books, not in 2B" goes to vendor follow-up. "In 2B, not in books"
          goes to internal checking before you accept anything in IMS.
        </li>
        <li>
          <strong>Take IMS actions deliberately.</strong> Accept what's verified, reject what's wrong, keep
          pending what you're still checking (where pending is allowed). Recompute 2B if you act after the 14th.
        </li>
        <li>
          <strong>Review with your CA</strong> before filing, especially eligibility, reversals and anything
          large or unusual.
        </li>
      </ol>

      <h2>Sample prompt: build a mismatch checker</h2>
      <p>
        Here's a prompt you could give an AI coding assistant to build a small browser-based tool. Test it with
        made-up data first.
      </p>
      <blockquote>
        Build me a simple web page that runs entirely in the browser, with no data sent anywhere. It should let
        me upload two CSV files: "Books" (my purchase register) and "2B" (downloaded from the GST portal). Both
        have columns: GSTIN, Invoice No, Invoice Date, Taxable Value, IGST, CGST, SGST. Let me map columns if the
        headers are different.
        <br />
        <br />
        For matching: first uppercase and trim GSTINs. Create a cleaned invoice number by removing spaces,
        slashes, hyphens and the prefix "INV", stripping leading zeros, and removing a financial-year suffix like
        "25-26" or "2025-26". Match rows on GSTIN plus cleaned invoice number. If no match is found, check
        whether a 2B row has the same cleaned invoice number and a GSTIN that differs by one or two characters,
        and mark it "Possible GSTIN typo."
        <br />
        <br />
        For matched rows, compare total tax. Mark differences of ₹1 or less as "Rounding" and anything larger as
        "Amount mismatch." Also flag if one side has IGST and the other has CGST + SGST.
        <br />
        <br />
        Show four tabs: Matched, Needs review (with the reason), In Books only, In 2B only. Show counts and
        rupee totals at the top. Let me download each tab as a CSV. Do not give any advice on whether ITC can be
        claimed; just show the differences.
      </blockquote>
      <p>
        The last line matters. You want the tool to sort and show, not to pretend to give tax opinions.
      </p>

      <h2>What the output might look like</h2>
      <p>
        Here's an illustrative example. <strong>All data below is made up</strong>, including the GSTINs, which
        are dummy values.
      </p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Vendor</th>
              <th>Books: GSTIN / Inv No</th>
              <th>2B: GSTIN / Inv No</th>
              <th>Tax (Books vs 2B)</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>V001</td>
              <td>27ABCDE1234F1Z5 / INV/0045</td>
              <td>27ABCDE1234F1Z5 / 45/25-26</td>
              <td>₹18,000.00 vs ₹18,000.40</td>
              <td>Matched after cleaning; rounding</td>
            </tr>
            <tr>
              <td>V002</td>
              <td>29PQRSX5678K1Z2 / 1187</td>
              <td>29PQRSX5876K1Z2 / 1187</td>
              <td>₹9,000 vs ₹9,000</td>
              <td>Possible GSTIN typo (two characters swapped)</td>
            </tr>
            <tr>
              <td>V003</td>
              <td>07LMNOP4321Q1Z8 / A-332</td>
              <td>Not found</td>
              <td>₹27,000 vs nil</td>
              <td>In Books only: follow up with vendor</td>
            </tr>
            <tr>
              <td>V004</td>
              <td>33WXYZA8765R1Z1 / 5521</td>
              <td>33WXYZA8765R1Z1 / 5521</td>
              <td>CGST+SGST ₹4,500 vs IGST ₹4,500</td>
              <td>Needs review: tax type differs</td>
            </tr>
            <tr>
              <td>V005</td>
              <td>Not found</td>
              <td>24DEFGH2468S1Z3 / 9087</td>
              <td>nil vs ₹3,600</td>
              <td>In 2B only: check before accepting in IMS</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Notice that the tool doesn't say "claim" or "don't claim" anywhere. V003 might be fine next month once
        the vendor files. V004 might be your data entry or the vendor's place-of-supply error. V005 might be a
        genuine invoice that's stuck in someone's inbox, or one you never received. Those calls are yours.
      </p>

      <h2>A short pre-3B checklist</h2>
      <ul>
        <li>Every record in IMS has a deliberate action, not just "no action" by default.</li>
        <li>If you changed anything after the 14th, you recomputed 2B.</li>
        <li>Vendors on the "In Books only" list have been contacted, with dates noted.</li>
        <li>Blocked credits and required reversals have been reviewed by a person who knows the rules.</li>
        <li>Your CA has seen anything large, unusual or older than a few months.</li>
      </ul>

      <h2>Your next step today</h2>
      <p>
        Take last month's purchase register and 2B. Make a copy, replace vendor names with codes, and pick just
        one problem: the invoice-number format mess. Ask an approved AI tool for a formula that creates a cleaned
        invoice number column, test it on 20 rows, and see how many "unmatched" invoices suddenly match. That one
        formula might save you an hour next month.
      </p>
      <p>
        If you'd like to get comfortable building small tools like the checker above, Chapter 1 of{" "}
        <Link to="/overview">our course</Link> walks you through building a working tool in your browser in about
        20 minutes, free and with no card needed. You can <Link to="/signup">start here</Link>.
      </p>

      <div className="sources">
        <h3>Sources</h3>
        <ul>
          <li>
            <a
              href="https://tutorial.gst.gov.in/userguide/returns/FAQ_gstr2b.htm"
              target="_blank"
              rel="noopener noreferrer"
            >
              GST Portal (GSTN): FAQs on viewing Form GSTR-2B
            </a>{" "}
            (accessed October 2026)
          </li>
          <li>
            <a
              href="https://tutorial.gst.gov.in/downloads/news/final_faqs_on_ims_22_09_2024.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              GSTN: FAQs on Invoice Management System (IMS)
            </a>{" "}
            (September 2024)
          </li>
          <li>
            <a
              href="https://www.mahagst.gov.in/public/uploads/gstnadvisory/1760528794_371%20Advisory%20New%20Changes%20in%20Invoice%20Management%20System%20(IMS).pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              GSTN advisory: New changes in Invoice Management System (IMS)
            </a>{" "}
            (September 23, 2025; copy hosted by Maharashtra GST Department)
          </li>
          <li>
            <a
              href="https://www.mahagst.gov.in/public/uploads/gstnadvisory/1768890416_375%20Attention%20%20Important%20Advisory%20on%20IMS.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              GSTN advisory: Attention, important advisory on IMS
            </a>{" "}
            (October 8, 2025; copy hosted by Maharashtra GST Department)
          </li>
          <li>
            <a
              href="https://tutorial.gst.gov.in/downloads/news/advisory_on_ims_offline_tool_23rd_april_2026.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              GSTN: Advisory for IMS Offline Tool on GST Portal
            </a>{" "}
            (April 2026)
          </li>
          <li>
            <a
              href="https://tutorial.gst.gov.in/downloads/matchingtool.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              GSTN: FAQs and User Manual, Matching Offline Tool
            </a>{" "}
            (accessed October 2026)
          </li>
          <li>
            <a
              href="https://taxguru.in/goods-and-service-tax/claim-itc-gstr-2b-mandatory-w-e-f-01-01-2022.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              TaxGuru: Claim ITC as per GSTR-2B mandatory w.e.f. 01.01.2022
            </a>{" "}
            (December 2, 2022)
          </li>
          <li>
            <a
              href="https://taxguru.in/goods-and-service-tax/gst-ims-september-2026-credit-note-pending-rules-gstr-2b-itc-reversal-controls.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              TaxGuru: GST IMS for September 2026, credit-note pending rules, GSTR-2B and ITC reversal controls
            </a>{" "}
            (October 13, 2026)
          </li>
          <li>
            <a href="https://ai.icai.org/usecases_details.php?id=152" target="_blank" rel="noopener noreferrer">
              ICAI AI portal: Streamlining GST compliance, a deep dive into the GSTR-2B reconciliation tool
            </a>{" "}
            (accessed October 2026)
          </li>
        </ul>
      </div>
    </>
  );
}
