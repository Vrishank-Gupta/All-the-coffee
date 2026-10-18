export default function AiCantDoYourJobYet() {
  return (
    <>
      <p>
        Ask an AI tool to clean a messy spreadsheet, and it'll often do a genuinely impressive job, fixing date
        formats, catching obvious duplicates, standardizing inconsistent text. Ask it to clean a messy spreadsheet
        for your actual team's actual monthly report, the one with the one column that means something different
        depending on which region filled it in, and it'll confidently get something subtly wrong.
      </p>
      <p>
        That gap is worth understanding honestly, both because it tells you where AI genuinely helps today, and
        because it's good news about your own job security, not bad news.
      </p>

      <h2>Where AI is genuinely strong with spreadsheet-style work</h2>
      <ul>
        <li>Spotting obvious formatting inconsistencies: dates in three different formats, inconsistent capitalization, extra whitespace</li>
        <li>Finding exact or near-exact duplicate rows</li>
        <li>Writing a formula or a script to do something repetitive and well-defined, once you describe it clearly</li>
        <li>Summarizing what's in a dataset at a glance, when the data is clean to begin with</li>
      </ul>

      <h2>Where it still struggles</h2>
      <ul>
        <li>
          <strong>Undocumented context.</strong> Why does row 47 look like an outlier but isn't actually wrong?
          Usually because of some exception someone explained verbally three years ago and never wrote down
          anywhere. AI has no way to know that.
        </li>
        <li>
          <strong>Multi-step numerical reasoning across a large, real dataset</strong>, reliably, without a
          silent error somewhere in the chain. Small mistakes compound, and nothing flags them for you unless you
          check.
        </li>
        <li>
          <strong>Knowing what "normal" looks like for your specific business</strong>, as opposed to what looks
          statistically unusual in general. A number that would be alarming for most companies might be entirely
          expected for yours, for reasons only someone with real context would know.
        </li>
        <li>
          <strong>Accountability.</strong> If a report goes out with a wrong number in it, "the AI did it" isn't
          an answer anyone can accept. Someone has to have actually checked.
        </li>
      </ul>

      <h2>Why this is good news, not bad news</h2>
      <p>
        If AI could fully replace the judgment part of spreadsheet work, the part where you catch the thing that
        looks technically fine but is actually wrong given context only you have, that would genuinely threaten a
        lot of jobs built around exactly that judgment. It can't, not yet, and arguably not for a while. What it
        can do is take the repetitive, mechanical parts off your plate, the parts that were never actually why
        you were valuable in the first place.
      </p>
      <blockquote>
        AI is very good at the parts of spreadsheet work that were always the boring parts. It's still bad at the
        parts that required actually understanding the business. That second part was always the real job.
      </blockquote>

      <h2>A practical way to use this</h2>
      <p>
        Let AI handle the cleanup, the formatting, the obvious duplicate-finding, the first-pass summary. Keep
        the final sanity check for yourself, specifically looking for anything that's technically consistent but
        contextually wrong. That division of labor is exactly what you build hands-on in Chapter 5 of this
        course, cleaning a genuinely messy spreadsheet and catching a bug most people would miss entirely.
      </p>
    </>
  );
}
