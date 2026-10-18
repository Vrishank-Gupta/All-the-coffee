export default function AiHiringHrGuide() {
  return (
    <>
      <p>
        In 2018, it came out that a major tech company had spent years building an internal AI tool to screen
        engineering resumes, and had to scrap it. The system had taught itself that male candidates were
        preferable, because it learned from a decade of the company's own past hiring data, and that data
        reflected a male-dominated industry. The AI wasn't malicious. It was just very good at finding the
        pattern that was actually there, which happened to be a pattern nobody wanted it to find.
      </p>
      <p>
        That case became famous because it's such a clean example of the real risk with AI in hiring: these
        tools don't invent bias, they inherit it, usually from exactly the historical data you'd assume is
        safest to learn from.
      </p>

      <h2>Where AI genuinely helps in hiring today</h2>
      <ul>
        <li>Summarizing a long resume against a specific role's actual requirements, faster than a manual first pass</li>
        <li>Drafting consistent, well-written outreach messages to candidates at scale</li>
        <li>Scheduling logistics: finding interview slots across multiple calendars</li>
        <li>Flagging genuinely clear mismatches early, like a role requiring a specific certification the candidate doesn't list</li>
      </ul>

      <h2>Where it needs a human in the loop, every time</h2>
      <p>
        Any decision that filters a real person out of consideration should have a human actually look at the
        reasoning, not just a pass/fail score from a model. Resume-screening tools in particular can pick up on
        proxies for protected characteristics, a graduation year that implies age, a name that implies gender or
        ethnicity, a neighborhood or school that implies socioeconomic background, without anyone intending it
        and often without it being obvious from the outside.
      </p>

      <h2>Questions worth asking any vendor pitching you an "AI-powered" hiring tool</h2>
      <ul>
        <li>What data was this model trained or fine-tuned on, and whose hiring decisions does that reflect?</li>
        <li>Has it been independently audited for bias across gender, age, and other protected characteristics, and can you see that audit?</li>
        <li>Does a human review every rejection, or only ones the system flags as borderline?</li>
        <li>Can a candidate ask for their application to be reviewed by a person, and is that process actually real?</li>
        <li>What happens to candidate data after the hiring process ends?</li>
      </ul>
      <p>
        If a vendor can't answer these clearly, that's itself useful information. A tool that can't explain its
        own reasoning isn't one you can defend later if a hiring decision is ever questioned, and in HR, that
        day eventually comes for every process you run.
      </p>

      <h2>The practical middle ground</h2>
      <p>
        You don't need to avoid AI in hiring to avoid this risk. You need to use it for the parts that are
        genuinely mechanical, scheduling, summarizing, drafting, and keep a real person making the actual
        judgment calls about who moves forward. That's not a compromise position, it's the approach that gets
        you the speed benefit without inheriting a decade-old bias problem you didn't know you were buying.
      </p>
      <blockquote>
        The goal isn't a hiring process with no AI in it. It's a hiring process where you can explain, in plain
        language, exactly why any given candidate moved forward or didn't.
      </blockquote>
    </>
  );
}
