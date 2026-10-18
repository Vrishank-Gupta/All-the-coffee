export default function PromptEngineeringIsDying() {
  return (
    <>
      <p>
        A couple of years ago, "prompt engineering" was treated almost like a magic spell. There were guides on
        the exact phrasing that unlocked better answers, the right way to tell an AI to "act as an expert," the
        specific formatting tricks that supposedly made models smarter. Some companies even hired people with
        that literal job title.
      </p>
      <p>
        Most of that is quietly becoming irrelevant. Not because prompting doesn't matter, but because the
        models got good enough at understanding plain, ordinary language that the elaborate incantations stopped
        being necessary.
      </p>

      <h2>What changed</h2>
      <p>
        Early AI models were genuinely picky. Phrase a request slightly oddly, and you'd get a worse answer.
        That made clever prompt formulas feel valuable, because they reliably nudged a finicky system toward a
        better result. Newer models are far better at inferring what you actually mean, even from a casually
        worded request, which means most of the old tricks stopped adding much.
      </p>
      <p>
        It's a bit like how you used to need to know the exact Italian terms to order a good coffee, ristretto,
        macchiato, the precise words mattered to get what you wanted. A good barista today just asks "strong or
        mild? Sweet or not?" and gets you there anyway. The skill moved from knowing the magic words to just
        being able to clearly describe what you actually want.
      </p>

      <h2>What actually still matters</h2>
      <ul>
        <li>
          <strong>Context, not cleverness.</strong> Telling the AI who the output is for, what it's going to be
          used for, and any constraints that matter, gets you a better result than any clever phrasing trick.
        </li>
        <li>
          <strong>Being specific about the output</strong>, not the process. "Write a two-paragraph summary a
          non-technical manager could read in 30 seconds" beats a vague "summarize this" every time.
        </li>
        <li>
          <strong>Iterating instead of front-loading.</strong> You don't need to get the perfect prompt on the
          first try. Ask for a draft, then say what's wrong with it, the same way you'd give feedback to a
          colleague.
        </li>
        <li>
          <strong>Providing a real example</strong> of the kind of output you want, when you have one. Nothing
          communicates intent faster than a concrete example to match.
        </li>
      </ul>

      <h2>A quick before and after</h2>
      <p>
        <strong>Old style:</strong> "You are a world-class expert copywriter with 20 years of experience. Using
        advanced persuasion techniques, craft a compelling email..."
      </p>
      <p>
        <strong>What actually works just as well now:</strong> "Write a short email to a client whose project is
        two weeks late. Be honest about the delay, don't over-apologize, and give them a specific new date."
      </p>
      <p>
        The second one isn't clever. It's just clear. That's the actual skill now, and it's one you already have,
        because it's the same skill as giving a clear instruction to a new colleague.
      </p>

      <h2>What this means for you</h2>
      <p>
        You don't need to study prompt engineering as a discipline to get good results from AI today. You need
        to practice describing what you want clearly, giving relevant context, and treating the first response
        as a draft to refine, not a final answer to accept or reject. That's a much lower bar than the "magic
        words" era made it seem, and it's a skill you build in minutes, not months.
      </p>
    </>
  );
}
