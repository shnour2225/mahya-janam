# Project: Mahya Janam — A Persian Digital Love Letter (Romantic Persian Love Page)

Act as a senior frontend engineer, creative developer, and award-winning UI/UX designer.

Build a complete, polished, production-ready static website from scratch. This website is a personal digital love letter that I intend to share with my girlfriend.

The result should feel intimate, poetic, beautiful, emotionally engaging, and carefully crafted. It should not look like a generic Valentine's Day landing page or an AI-generated template.

**You are responsible for actual implementation, not just planning or producing example code.** Create the project, implement the website, run it, inspect it, and refine it.

---

## 1. Mandatory frontend design skill

I have installed this skill globally:

`~/.agents/skills/design-taste-frontend/SKILL.md`

It is the default, uncustomized version of the skill.

Before implementation:

1. Load and apply the installed `design-taste-frontend` skill using OpenCode's skill mechanism (`@design-taste-frontend`).
2. Read its `SKILL.md` completely.
3. Follow its design principles and workflows.
4. Inspect any supporting files or references that actually exist and are relevant to its instructions.
5. Apply its recommendations specifically to this project.

Do not assume that I have customized the skill or created additional design references.

Do not modify the global skill, its files, or my OpenCode configuration. Do not create another skill.

The skill provides general design expertise. This prompt defines the specific visual identity and requirements of this website.

If the skill cannot be discovered or loaded, investigate the provided path and OpenCode skill discovery before proceeding.

---

## 2. Start from zero

**There is no existing project or application.**

The current working directory is the intended project root.

Initialize everything from scratch.

Two source assets are expected to be available in the project root:

1. `Heartfelt-Writing.txt` — contains my personal romantic message.
2. `Arman Garshasbi - Benshin Tamashayat Konam (320).mp3` — the actual background music.

Inspect both files before implementation.

Requirements:

- Do not assume that `package.json`, a framework, or any existing application code exists.
- Choose and initialize an appropriate technology stack.
- Preserve the supplied source assets.
- Do not replace the supplied content with invented placeholders.
- Do not introduce unnecessary infrastructure or dependencies.

If either asset is genuinely missing, report that explicitly rather than silently inventing its contents.

---

## 3. Product vision and emotional direction

Build a single-page, vertically scrollable romantic experience written entirely in Persian (Farsi).

The central feeling I want to communicate is:

I have been in a long-distance relationship. When I finally meet her after a long time apart, I experience a particular feeling that is difficult to describe. This website should communicate that feeling: love, longing, excitement, affection, belonging, and the happiness of finally being close to the person I love.

The experience should feel like a beautiful personal dedication made specifically for her.

### Art direction

Aim for:

- Romantic, warm, intimate, and dreamy.
- Elegant, modern, and visually sophisticated.
- Cute without being childish.
- Poetic without becoming visually overwhelming.
- Emotional without excessive clichés.
- Beautiful typography and deliberate composition.
- Organic, smooth, subtle animations.

Possible visual direction:

- Deep burgundy, muted rose, dusty pink, warm cream, and subtle neutral colors.
- Atmospheric gradients and soft lighting.
- Delicate textures and subtle visual depth.
- Carefully composed backgrounds.
- Beautiful typographic layouts.
- Subtle floating elements and elegant transitions.

These are suggestions, not restrictions. Use your design judgment and the installed skill to develop a coherent visual identity.

Avoid:

- Generic Valentine's Day layouts.
- Excessive heart icons and emojis.
- Overused glassmorphism.
- Random floating decorations.
- Repetitive cards.
- Generic stock illustrations.
- Excessive gradients and shadows.
- Anything that makes the page look like a template.

The website should feel like a carefully art-directed digital love letter.

---

## 4. Technology and architecture

Because this is a single static page, choose the simplest appropriate architecture.

Preferred direction:

- Vite with vanilla TypeScript, HTML, and CSS, or another lightweight static-site solution if it offers a clear advantage.
- No backend.
- No database.
- No authentication.
- No external API dependencies.
- No unnecessary React or Next.js application.
- No SPA router unless genuinely necessary.

Optimize for simplicity, performance, maintainability, and straightforward Cloudflare Pages deployment.

Use a clean and understandable project structure.

Do not overengineer the solution.

---

## 5. Mobile-first design

Mobile is the primary target.

The website should look exceptional on a modern smartphone.

Requirements:

- Mobile-first layout decisions.
- Visually impressive opening screen.
- Excellent Persian typography.
- Correct RTL layout.
- Comfortable reading experience.
- Appropriate text sizes and line heights.
- Touch-friendly interactive controls.
- Proper mobile safe-area handling.
- No horizontal overflow.
- Smooth scrolling.
- Responsive desktop adaptation.

Set:

- HTML language to `fa`.
- Document direction to `rtl`.
- Correct text direction for all Persian content.

### Typography

Use Vazirmatn or another excellent modern Persian typeface.

Prefer locally hosted fonts where practical. Include appropriate font fallbacks.

Pay special attention to Persian letter shaping, line breaks, punctuation, ZWNJ characters, and spacing.

The romantic sentences should look like poetry, not ordinary body text.

---

## 6. Website structure and content

Design the experience as a continuous emotional journey, not a collection of unrelated sections.

### Section 1 — The opening experience

When the website opens, the following exact text must be immediately visible:

**«وابسته شد تمام من به تمام تو»**

Preserve this wording exactly.

This is the central statement of the opening screen.

Make it visually dominant through excellent Persian typography, composition, and restrained animation.

The first screen should communicate the website's emotional identity immediately.

Consider:

- Elegant typography reveal.
- Atmospheric background.
- Subtle decorative motion.
- Thoughtful contrast and negative space.
- A beautiful connection between the opening statement and the music.

Do not hide the main statement behind a loading screen or music-permission screen.

### Section 2 — The song and its lyrics

The provided song is:

`Arman Garshasbi - Benshin Tamashayat Konam (320).mp3`

The most meaningful opening lyrics are:

«عمری به هر کوی و گذر گشتم که پیدایت کنم

اکنون که پیدا کرده ام بنشین تماشایت کنم»

Present these lyrics prominently and beautifully.

They should be an important emotional moment in the page.

Creative possibilities:

- Two-line poetic composition.
- Gradual text reveal.
- Beautiful typographic hierarchy.
- Elegant visual treatment of the second line.
- Subtle transitions that complement the music's atmosphere.

Do not invent timestamps or claim to synchronize the text precisely with the song. Independent, tasteful animation is sufficient.

### Section 3 — My personal message

Read the actual contents of:

`Heartfelt-Writing.txt`

This file contains the personal message I want to dedicate to her.

Present it as the emotional heart of the website.

Requirements:

- The displayed message must contain 110–130 Persian words.
- Preserve the author's original emotions, meaning, and personal voice.
- Do not replace it with generic AI-generated romantic writing.
- If the original is longer, trim only unnecessary repetition.
- If it is shorter, expand it minimally using the feelings and context already provided.
- Preserve important personal details.
- Use natural Persian and correct punctuation.
- Structure paragraphs for comfortable reading.

Count words using a consistent whitespace-separated Persian word-count convention, and report the final count.

Visually, think of an intimate letter or personal dedication, but execute it with a modern, sophisticated web aesthetic.

It should feel personal, not like an ordinary content card.

### Section 4 — Additional romantic statements

Use the following sentences naturally throughout the experience:

- «در این جهان بی کران، تنها تویی جهان من»
- «خواستنت تمنای هر رگ»
- «تو نیم دیگرم که نه، تمام من تو هستی»

Preserve their wording.

Do not put all three together just to satisfy the requirement.

Give each sentence its own appropriate visual moment where possible.

### Section 5 — Ending

Create a memorable emotional ending.

The ending should make the visitor feel that the entire experience was intentionally created for someone special.

Use a beautiful closing composition, subtle motion, and one of the provided romantic sentences if appropriate.

Avoid generic footers, unnecessary navigation, contact information, or unrelated calls to action.

---

## 7. Music experience

Use the actual provided MP3 as background music throughout the website.

Requirements:

1. Attempt audible autoplay when the page loads.
2. Detect whether browser autoplay is blocked.
3. If blocked, present an attractive, unobtrusive one-tap action to start the music.
4. Keep the main opening text visible even when the user needs to activate music.
5. Add a beautiful, minimal music control.
6. Allow play/pause.
7. Consider an optional volume control if it fits the mobile UI.
8. Keep one persistent audio element mounted for the entire page.
9. Scrolling must not interrupt music playback.
10. Play the track normally without automatically restarting it at the end.

Do not silently start muted playback and pretend the music is playing.

Do not repeatedly attempt autoplay after rejection.

Use an appropriate audio implementation with proper error handling.

Place the original MP3 in the static public asset directory, preferably under `public/audio/`, preserving its filename.

Ensure it is included in the production build and its URL resolves correctly.

---

## 8. Motion and interactions

Motion is an important part of the experience.

Use animations to strengthen the emotional atmosphere rather than simply decorate the page.

Consider:

- Beautiful initial typography reveal.
- Gentle section entrance animations.
- Delicate floating decorative elements.
- Subtle background movement.
- Smooth transitions between sections.
- Elegant interactions with the music control.
- Carefully timed text reveals.
- Very subtle parallax where appropriate.

Performance requirements:

- Prefer performant CSS animations.
- Avoid unnecessary animation libraries.
- Avoid expensive continuous animations.
- Ensure smooth scrolling on mid-range mobile devices.
- Respect `prefers-reduced-motion`.
- Do not sacrifice readability for animations.
- Avoid distracting or excessive motion.

The result should feel alive, fluid, and polished.

---

## 9. Persian text and accessibility

Pay close attention to RTL behavior.

Check:

- Correct alignment and text flow.
- Correct Persian shaping.
- Punctuation placement.
- Mixed Persian/Latin text behavior.
- Appropriate line breaks.
- Consistent typography.
- Readable contrast.

Also implement:

- Semantic HTML.
- Meaningful heading hierarchy.
- Accessible music controls.
- Keyboard accessibility.
- Visible focus states.
- Reduced-motion support.
- Proper document metadata.

---

## 10. Routing and exact URL

The final website must be accessible at:

`/mahya-janam`

This exact path is important.

Requirements:

- Direct navigation to `/mahya-janam` must work.
- Refreshing that URL must work.
- The root path `/` must redirect to `/mahya-janam`.
- Static assets must load correctly from this route.
- No dependence on navigation from another page.

Prefer generating an actual static HTML entry at the requested route rather than relying unnecessarily on SPA fallback behavior.

Test the exact URL locally and on the deployed static build.

---

## 11. Cloudflare Pages deployment

The website will be deployed using Cloudflare Pages.

Prepare the project for static deployment.

Requirements:

- No Cloudflare Worker unless absolutely necessary.
- No server-side runtime.
- No backend infrastructure.
- Correct static build configuration.
- Correct output directory.
- Correct asset paths.
- Proper root redirect.
- Direct route support.
- Include the music file and fonts in the build.

Use the appropriate Cloudflare Pages configuration, including `_redirects` where needed.

Ensure the redirect configuration ends up in the final static output directory.

At completion, provide the exact deployment settings:

- Framework preset.
- Build command.
- Build output directory.
- Environment variables, if any.
- Additional configuration, if required.

Verify the implementation using current Cloudflare Pages documentation rather than guessing.

---

## 12. Implementation and verification workflow

Follow this workflow.

### Phase 1 — Preparation

- Load the mandatory design skill.
- Inspect the workspace.
- Verify the two provided assets.
- Read the entire personal message.
- Inspect the MP3 metadata if useful.
- Decide on the minimal appropriate technology stack.

### Phase 2 — Visual design

Before implementing, establish:

- A coherent visual identity.
- Color palette.
- Persian typography.
- Mobile layout.
- Section compositions.
- Animation language.
- Music control design.

Use the design skill to guide these decisions.

Do not stop at a generic layout.

### Phase 3 — Implementation

Create the complete application from scratch.

Implement every section, responsive styling, animations, audio behavior, routing, metadata, and deployment configuration.

### Phase 4 — Actual visual inspection

If browser automation or screenshot tooling is available, use it.

Inspect at least:

- A modern mobile viewport (approximately 390 × 844).
- A larger mobile viewport.
- A desktop viewport.

Check:

- First-screen composition.
- Typography.
- Persian line breaks.
- Text readability.
- Section spacing.
- Animation quality.
- Audio behavior.
- Music controls.
- Horizontal overflow.
- Overall consistency.

Actually inspect the rendered website, not just the source code.

### Phase 5 — Refinement

After the first implementation:

1. Review the page as a professional UI/UX designer.
2. Identify visual weaknesses.
3. Refine typography, spacing, colors, composition, and animation.
4. Fix any technical or responsive issues.
5. Build again and verify the final output.

Do not consider the task complete merely because the website compiles.

---

## 13. Final acceptance criteria

The implementation is complete only when:

- [ ] A complete project has been created from scratch.
- [ ] The installed design skill has been applied.
- [ ] The website is entirely in Persian.
- [ ] RTL is correctly implemented.
- [ ] The opening statement appears immediately.
- [ ] The supplied song is used.
- [ ] Autoplay failure is handled gracefully.
- [ ] Music controls work.
- [ ] The provided lyrics are presented beautifully.
- [ ] The original personal message is used and contains 110–130 words.
- [ ] All three additional romantic sentences are used naturally.
- [ ] The ending is emotionally memorable.
- [ ] Mobile design is excellent.
- [ ] Desktop layout is polished.
- [ ] Animations are performant and respect reduced motion.
- [ ] `/mahya-janam` works directly and on refresh.
- [ ] `/` redirects to `/mahya-janam`.
- [ ] Cloudflare Pages deployment is prepared.
- [ ] Production build succeeds.
- [ ] No important errors or broken assets remain.

### Final report

After implementation, provide:

1. Technology stack and rationale.
2. Project structure.
3. Files created.
4. Visual design decisions.
5. Music playback behavior and autoplay fallback.
6. Final personal-message word count.
7. Local development command.
8. Production build command.
9. Exact Cloudflare Pages deployment settings.
10. Remaining limitations, if any.

**Final design goal:** Make this feel like a small, beautiful, interactive Persian love letter — something that makes someone smile, feel loved, and understand how much they mean to the person who created it.
