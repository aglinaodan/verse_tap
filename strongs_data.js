/**
 * strongs_data.js
 * ─────────────────────────────────────────────────────────────────────────
 * A small, hand-curated Strong's Hebrew/Greek dictionary + verse-to-word
 * alignment table, for the "Find Meaning" word-tap feature in the Bible
 * reader and note viewer.
 *
 * SCOPE — READ THIS BEFORE ADDING MORE:
 * This ships with real, accurate data for all of Genesis 1 and 2 — the full
 * creation account, the seventh-day rest, and the Adam/Eve narrative
 * (Gen 2:4-25). It is NOT a full-Bible interlinear dataset — building one
 * of those requires either a licensed interlinear/morphology dataset (e.g.
 * OpenScriptures Hebrew Bible, STEP Bible data) or scraping biblehub.com's
 * ~31,000 individual verse pages, which (a) biblehub doesn't expose via a
 * CORS-enabled API a client-side PWA could call directly, and (b) is well
 * beyond a single hand-curated pass. Treat this file as a seed — extend
 * `ALIGNMENT` book/chapter by book/chapter as you go, the same way
 * ESV_VERSES in esv_version.js grew. Genesis 2:11 is intentionally
 * untagged (river names — Pishon, Havilah, Cush — are proper nouns not yet
 * in the dictionary); everything else in Gen 1-2 has at least its
 * recurring content words tagged.
 *
 * SOURCE: entries below are drawn from the public-domain 1890 Strong's
 * Exhaustive Concordance / Brown-Driver-Briggs Hebrew Lexicon (as hosted at
 * biblehub.com/hebrew/<number>.htm) — this is out-of-copyright reference
 * material, not the ESV translation text.
 *
 * DATA SHAPES:
 *   DICTIONARY["H8064"] = {
 *     word: "שָׁמַיִם",            // original-language spelling
 *     translit: "shamayim",       // transliteration
 *     pronunciation: "shaw-mah'-yim",
 *     pos: "Noun Masculine",      // part of speech
 *     definition: "...",          // short Strong's/BDB gloss
 *     kjvUsage: "air, astrologer, heaven(-s)"
 *   }
 *
 *   ALIGNMENT["GEN:1:1"] = [
 *     { word: "beginning", strongs: "H7225" },  // "word" = the English word
 *     ...                                        // as it appears on screen,
 *   ]                                             // matched in reading order.
 *
 * "word" is matched case-insensitively, in order, against the rendered
 * verse text — this works for both ESV and KJV wording for the verses
 * covered so far since they happen to agree here, but a chapter added later
 * where the two translations diverge in word choice may need its own entry.
 */
(function (root) {
  const DICTIONARY = {
    'H7225': {
      word: 'רֵאשִׁית', translit: "re'shiyth", pronunciation: 'ray-sheeth',
      pos: 'Noun Feminine',
      definition: 'the first, in place, time, order or rank (specifically, a firstfruit)',
      kjvUsage: 'beginning, chief(-est), first(-fruits, part, time), principal thing'
    },
    'H430': {
      word: 'אֱלֹהִים', translit: 'elohim', pronunciation: "el-o-heem'",
      pos: 'Noun Masculine Plural',
      definition: 'gods in the ordinary sense; but specifically used (in the plural, especially with the article) of the supreme God',
      kjvUsage: 'God, god, judge, GOD, goddess, great, mighty, angels, exceeding, godly'
    },
    'H1254': {
      word: 'בָּרָא', translit: "bara'", pronunciation: "baw-raw'",
      pos: 'Verb',
      definition: '(absolutely) to create; (qualified) to cut down, select, feed (as formative processes) — always of divine activity in the sense "create"',
      kjvUsage: 'choose, create (creator), cut down, dispatch, do, make (fat)'
    },
    'H8064': {
      word: 'שָׁמַיִם', translit: 'shamayim', pronunciation: "shaw-mah'-yim",
      pos: 'Noun Masculine',
      definition: 'the sky (as aloft; the dual perhaps alluding to the visible arch in which the clouds move, as well as to the higher ether where the celestial bodies revolve)',
      kjvUsage: 'air, astrologer, heaven(-s)'
    },
    'H776': {
      word: 'אֶרֶץ', translit: 'erets', pronunciation: "eh'-rets",
      pos: 'Noun Feminine',
      definition: 'the earth (at large, or partitively a land) — firm, the ground, as opposed to the heavens',
      kjvUsage: 'common, country, earth, field, ground, land, nations, way, wilderness, world'
    },
    'H3615': {
      word: 'כָּלָה', translit: 'kalah', pronunciation: "kaw-law'",
      pos: 'Verb',
      definition: 'to end, whether intransitive (to cease, be finished, perish) or transitive (to complete, prepare, consume)',
      kjvUsage: 'accomplish, cease, consume (away), determine, destroy (utterly), be (when...were) done, (be an) end (of), expire, fail, faint, finish, fulfil, leave (off), spend, waste'
    },
    'H6635': {
      word: 'צָבָא', translit: "tsaba'", pronunciation: "tsaw-baw'",
      pos: 'Noun Masculine',
      definition: 'a mass of persons (or figuratively, things), especially regularly organized for war (an army); of the sun, moon, stars, and the whole created order',
      kjvUsage: 'appointed time, army, battle, company, host, service, soldiers, waiting upon, warfare'
    },
    'H559': {
      word: 'אָמַר', translit: 'amar', pronunciation: "aw-mar'",
      pos: 'Verb',
      definition: 'to say (used with great latitude)',
      kjvUsage: 'answer, appoint, avouch, bid, boast self, call, certify, challenge, charge, command(-ment), commune, consider, declare, name, promise, say, speak, tell, utter'
    },
    'H216': {
      word: 'אוֹר', translit: 'or', pronunciation: 'ore',
      pos: 'Noun Feminine',
      definition: 'illumination or (concrete) luminary, in every sense, including lightning, happiness',
      kjvUsage: 'bright, clear, day, light(-ning), morning, sun'
    },
    'H2822': {
      word: 'חֹשֶׁךְ', translit: 'choshek', pronunciation: "kho-shek'",
      pos: 'Noun Masculine',
      definition: 'the dark; hence (literally) darkness; figuratively, misery, destruction, death, ignorance, sorrow, wickedness',
      kjvUsage: 'dark(-ness), night, obscurity'
    },
    'H2896': {
      word: 'טוֹב', translit: 'towb', pronunciation: 'tobe',
      pos: 'Adjective',
      definition: 'good (as an adjective) in the widest sense — pleasant, agreeable, beneficial, excellent, right',
      kjvUsage: 'beautiful, best, better, bountiful, fair, favour, fine, glad, good(-ness), goodly, graciously, joyful, kindly, loving, merry, pleasant, precious, prosperity, sweet, wealth, welfare'
    },
    'H3117': {
      word: 'יוֹם', translit: 'yowm', pronunciation: 'yome',
      pos: 'Noun Masculine',
      definition: 'a day (as the warm hours), whether literal (from sunrise to sunset, or from one sunset to the next), or figurative (a space of time defined by an associated term)',
      kjvUsage: 'age, always, chronicals, daily, day(-s), evening, (for) ever(-lasting, -more), full, life, season, time, when, while, year(-ly)'
    },
    'H3915': {
      word: 'לַיְלָה', translit: 'layil', pronunciation: "lah'-yil",
      pos: 'Noun Masculine',
      definition: 'properly, a twist (away of the light), i.e. night; figuratively, adversity',
      kjvUsage: '(mid-)night (season)'
    },
    'H6213': {
      word: 'עָשָׂה', translit: "`asah", pronunciation: "aw-saw'",
      pos: 'Verb',
      definition: 'to do or make, in the broadest sense and widest application',
      kjvUsage: 'accomplish, advance, appoint, bring forth, commit, deal, do, execute, exercise, fashion, finish, fit, fulfill, gather, get, keep, labour, maintain, make, observe, offer, perform, practise, prepare, procure, provide, put, set, work'
    },
    'H7200': {
      word: 'רָאָה', translit: "ra'ah", pronunciation: "raw-aw'",
      pos: 'Verb',
      definition: 'to see, literally or figuratively (in numerous applications, direct and implied, transitive, intransitive and causative)',
      kjvUsage: 'advise self, appear, approve, behold, consider, discern, (make to) enjoy, have experience, gaze, take heed, lo, look (on), perceive, provide, regard, respect, see, shew'
    },
    'H1288': {
      word: 'בָּרַךְ', translit: 'barak', pronunciation: "baw-rak'",
      pos: 'Verb',
      definition: 'to kneel; by implication to bless God (as an act of adoration), and (vice-versa) man (as a benefit)',
      kjvUsage: 'abundantly, bless, congratulate, kneel (down), praise, salute, thank'
    },
    'H6754': {
      word: 'צֶלֶם', translit: 'tselem', pronunciation: "tseh'-lem",
      pos: 'Noun Masculine',
      definition: 'a phantom, i.e. (figuratively) illusion, resemblance; hence, a representative figure — of God\'s making man in his own image',
      kjvUsage: 'image, vain shew'
    },
    'H120': {
      word: 'אָדָם', translit: 'adam', pronunciation: "aw-dawm'",
      pos: 'Noun Masculine',
      definition: 'ruddy, i.e. a human being (an individual or the species, mankind)',
      kjvUsage: 'another, hypocrite, common sort, low, man (mean, of low degree), person'
    },
    'H4325': {
      word: 'מַיִם', translit: 'mayim', pronunciation: "mah'-yim",
      pos: 'Noun Masculine',
      definition: 'water; figuratively, juice',
      kjvUsage: 'water(-ing, -course, -flood, -spring)'
    },
    'H1242': {
      word: 'בֹּקֶר', translit: 'boqer', pronunciation: "bo'-ker",
      pos: 'Noun Masculine',
      definition: 'properly, dawn (as the break of day); generally, morning',
      kjvUsage: 'day, early, morning, morrow'
    },
    'H6153': {
      word: 'עֶרֶב', translit: "`ereb", pronunciation: "eh'-reb",
      pos: 'Noun Masculine',
      definition: 'dusk',
      kjvUsage: 'day, even(-ing, tide), night'
    },
    'H7549': {
      word: 'רָקִיעַ', translit: 'raqiya', pronunciation: "raw-kee'-ah",
      pos: 'Noun Masculine',
      definition: 'properly, an expanse, i.e. the firmament or (apparently) visible arch of the sky — considered by the Hebrews as solid, supporting the "waters" above',
      kjvUsage: 'firmament'
    },
    'H7637': {
      word: 'שְׁבִיעִי', translit: "shbiy`iy", pronunciation: "sheb-ee-ee'",
      pos: 'Adjective',
      definition: 'seventh (ordinal number)',
      kjvUsage: 'seventh (time)'
    },
    'H7673': {
      word: 'שָׁבַת', translit: 'shabath', pronunciation: "shaw-bath'",
      pos: 'Verb',
      definition: 'to repose, i.e. desist from exertion',
      kjvUsage: '(cause to) cease, celebrate, (make to) rest, put away, still'
    },
    'H4399': {
      word: 'מְלָאכָה', translit: "mla'kah", pronunciation: "mel-aw-kaw'",
      pos: 'Noun Feminine',
      definition: 'properly, deputyship, i.e. ministry; generally, employment or work (abstractly or concretely); also property (as the result of labor)',
      kjvUsage: 'business, cattle, industrious, occupation, officer, thing (made), work(-man, -manship)'
    },
    'H3068': {
      word: 'יְהוָה', translit: 'Yhwh', pronunciation: 'yah-way',
      pos: 'Proper Name',
      definition: '(the) self-Existent or Eternal — Jehovah, the covenant name of the God of Israel',
      kjvUsage: 'Jehovah, the LORD'
    },
    'H3335': {
      word: 'יָצַר', translit: 'yatsar', pronunciation: "yaw-tsar'",
      pos: 'Verb',
      definition: 'to mould into a form, especially as a potter; figuratively, to determine (i.e. form a resolution)',
      kjvUsage: 'earthen, fashion, form, frame, make(-r), potter, purpose'
    },
    'H6083': {
      word: 'עָפָר', translit: "`aphar", pronunciation: "aw-fawr'",
      pos: 'Noun Masculine',
      definition: 'dust (as powdered or gray); hence, clay, earth, mud',
      kjvUsage: 'ashes, dust, earth, ground, morter, powder, rubbish'
    },
    'H127': {
      word: 'אֲדָמָה', translit: 'adamah', pronunciation: 'ad-aw-maw',
      pos: 'Noun Feminine',
      definition: 'soil (from its general redness)',
      kjvUsage: 'country, earth, ground, husband(-man), land'
    },
    'H5397': {
      word: 'נְשָׁמָה', translit: 'neshamah', pronunciation: "nesh-aw-maw'",
      pos: 'Noun Feminine',
      definition: 'a puff, i.e. wind, angry or vital breath, divine inspiration, intellect; or (concretely) a breathing creature',
      kjvUsage: 'blast, breath, inspiration, soul, spirit'
    },
    'H2416': {
      word: 'חַי', translit: 'chay', pronunciation: "khah'-ee",
      pos: 'Adjective',
      definition: 'alive; hence, raw (flesh); fresh (plant, water, year), strong; also life (or living thing)',
      kjvUsage: 'alive, life(-time), live(-ly), living (creature, thing)'
    },
    'H5315': {
      word: 'נֶפֶשׁ', translit: 'nephesh', pronunciation: "neh'-fesh",
      pos: 'Noun Feminine',
      definition: 'properly, a breathing creature, i.e. animal or (abstractly) vitality; used very widely in a literal, accommodated or figurative sense',
      kjvUsage: 'any, appetite, beast, body, creature, heart, life, mind, person, soul, self'
    },
    'H1588': {
      word: 'גַּן', translit: 'gan', pronunciation: 'gan',
      pos: 'Noun Masculine',
      definition: 'a garden (as fenced)',
      kjvUsage: 'garden'
    },
    'H5731': {
      word: 'עֵדֶן', translit: 'Eden', pronunciation: "ay'-den",
      pos: 'Proper Name',
      definition: 'Eden, the region of Adam\'s home — literally "delight"',
      kjvUsage: 'Eden'
    },
    'H6086': {
      word: 'עֵץ', translit: "`ets", pronunciation: 'ates',
      pos: 'Noun Masculine',
      definition: 'a tree (from its firmness); hence, wood',
      kjvUsage: 'carpenter, plank, staff, stalk, stick, timber, tree, wood'
    },
    'H5104': {
      word: 'נָהָר', translit: 'nahar', pronunciation: "naw-hawr'",
      pos: 'Noun Masculine',
      definition: 'a stream (including the sea; especially the Nile, Euphrates, etc.); figuratively, prosperity',
      kjvUsage: 'flood, river'
    },
    'H6763': {
      word: 'צֵלָע', translit: 'tsela', pronunciation: "tsay-law'",
      pos: 'Noun Feminine',
      definition: 'a rib (as curved), literally (of the body) or figuratively (of a door); hence, a side',
      kjvUsage: 'beam, board, chamber, corner, leaf, plank, rib, side'
    },
    'H802': {
      word: 'אִשָּׁה', translit: 'ishshah', pronunciation: "ish-shaw'",
      pos: 'Noun Feminine',
      definition: 'a woman (used in the same wide sense as man/mankind)',
      kjvUsage: '(adulter-)ess, each, every, female, wife, woman'
    },
    'H376': {
      word: 'אִישׁ', translit: 'iysh', pronunciation: 'eesh',
      pos: 'Noun Masculine',
      definition: 'a man as an individual or a male person',
      kjvUsage: 'each, every (one), fellow, husband, man(-kind), person'
    },
    'H6106': {
      word: 'עֶצֶם', translit: 'etsem', pronunciation: "eh'-tsem",
      pos: 'Noun Feminine',
      definition: 'a bone (as strong); by extension, the body; figuratively, the substance, i.e. selfsame',
      kjvUsage: 'body, bone, life, (self-)same, strength'
    },
    'H1320': {
      word: 'בָּשָׂר', translit: 'basar', pronunciation: "baw-sawr'",
      pos: 'Noun Masculine',
      definition: 'flesh (from its freshness); by extension, body, person',
      kjvUsage: 'body, flesh, kin, mankind, self, skin'
    },
    'H6174': {
      word: 'עָרוֹם', translit: 'arowm', pronunciation: "aw-rome'",
      pos: 'Adjective',
      definition: 'nude, either partially or totally',
      kjvUsage: 'naked'
    }
  };

  const ALIGNMENT = {
    'GEN:1:1': [
      { word: 'beginning', strongs: 'H7225' },
      { word: 'God', strongs: 'H430' },
      { word: 'created', strongs: 'H1254' },
      { word: 'heavens', strongs: 'H8064' },
      { word: 'earth', strongs: 'H776' }
    ],
    'GEN:1:2': [
      { word: 'earth', strongs: 'H776' },
      { word: 'darkness', strongs: 'H2822' },
      { word: 'God', strongs: 'H430' },
      { word: 'waters', strongs: 'H4325' }
    ],
    'GEN:1:3': [
      { word: 'God', strongs: 'H430' },
      { word: 'said', strongs: 'H559' },
      { word: 'light', strongs: 'H216' },
      { word: 'light', strongs: 'H216' }
    ],
    'GEN:1:4': [
      { word: 'God', strongs: 'H430' },
      { word: 'saw', strongs: 'H7200' },
      { word: 'light', strongs: 'H216' },
      { word: 'good', strongs: 'H2896' },
      { word: 'God', strongs: 'H430' },
      { word: 'light', strongs: 'H216' },
      { word: 'darkness', strongs: 'H2822' }
    ],
    'GEN:1:5': [
      { word: 'God', strongs: 'H430' },
      { word: 'light', strongs: 'H216' },
      { word: 'Day', strongs: 'H3117' },
      { word: 'darkness', strongs: 'H2822' },
      { word: 'Night', strongs: 'H3915' },
      { word: 'evening', strongs: 'H6153' },
      { word: 'morning', strongs: 'H1242' },
      { word: 'day', strongs: 'H3117' }
    ],
    'GEN:1:6': [
      { word: 'God', strongs: 'H430' },
      { word: 'said', strongs: 'H559' },
      { word: 'expanse', strongs: 'H7549' },
      { word: 'waters', strongs: 'H4325' },
      { word: 'waters', strongs: 'H4325' },
      { word: 'waters', strongs: 'H4325' }
    ],
    'GEN:1:7': [
      { word: 'God', strongs: 'H430' },
      { word: 'made', strongs: 'H6213' },
      { word: 'expanse', strongs: 'H7549' },
      { word: 'waters', strongs: 'H4325' },
      { word: 'expanse', strongs: 'H7549' },
      { word: 'waters', strongs: 'H4325' },
      { word: 'expanse', strongs: 'H7549' }
    ],
    'GEN:1:8': [
      { word: 'God', strongs: 'H430' },
      { word: 'expanse', strongs: 'H7549' },
      { word: 'evening', strongs: 'H6153' },
      { word: 'morning', strongs: 'H1242' },
      { word: 'day', strongs: 'H3117' }
    ],
    'GEN:1:9': [
      { word: 'God', strongs: 'H430' },
      { word: 'said', strongs: 'H559' },
      { word: 'waters', strongs: 'H4325' },
      { word: 'heavens', strongs: 'H8064' }
    ],
    'GEN:1:10': [
      { word: 'God', strongs: 'H430' },
      { word: 'Earth', strongs: 'H776' },
      { word: 'waters', strongs: 'H4325' },
      { word: 'God', strongs: 'H430' },
      { word: 'saw', strongs: 'H7200' },
      { word: 'good', strongs: 'H2896' }
    ],
    'GEN:1:11': [
      { word: 'God', strongs: 'H430' },
      { word: 'said', strongs: 'H559' },
      { word: 'earth', strongs: 'H776' },
      { word: 'earth', strongs: 'H776' }
    ],
    'GEN:1:12': [
      { word: 'earth', strongs: 'H776' },
      { word: 'God', strongs: 'H430' },
      { word: 'saw', strongs: 'H7200' },
      { word: 'good', strongs: 'H2896' }
    ],
    'GEN:1:13': [
      { word: 'evening', strongs: 'H6153' },
      { word: 'morning', strongs: 'H1242' },
      { word: 'day', strongs: 'H3117' }
    ],
    'GEN:1:14': [
      { word: 'God', strongs: 'H430' },
      { word: 'said', strongs: 'H559' },
      { word: 'expanse', strongs: 'H7549' },
      { word: 'heavens', strongs: 'H8064' },
      { word: 'day', strongs: 'H3117' },
      { word: 'night', strongs: 'H3915' }
    ],
    'GEN:1:15': [
      { word: 'expanse', strongs: 'H7549' },
      { word: 'heavens', strongs: 'H8064' },
      { word: 'light', strongs: 'H216' },
      { word: 'earth', strongs: 'H776' }
    ],
    'GEN:1:16': [
      { word: 'God', strongs: 'H430' },
      { word: 'made', strongs: 'H6213' },
      { word: 'light', strongs: 'H216' },
      { word: 'day', strongs: 'H3117' },
      { word: 'light', strongs: 'H216' },
      { word: 'night', strongs: 'H3915' },
      { word: 'made', strongs: 'H6213' }
    ],
    'GEN:1:17': [
      { word: 'God', strongs: 'H430' },
      { word: 'expanse', strongs: 'H7549' },
      { word: 'heavens', strongs: 'H8064' },
      { word: 'light', strongs: 'H216' },
      { word: 'earth', strongs: 'H776' }
    ],
    'GEN:1:18': [
      { word: 'day', strongs: 'H3117' },
      { word: 'night', strongs: 'H3915' },
      { word: 'light', strongs: 'H216' },
      { word: 'darkness', strongs: 'H2822' },
      { word: 'God', strongs: 'H430' },
      { word: 'saw', strongs: 'H7200' },
      { word: 'good', strongs: 'H2896' }
    ],
    'GEN:1:19': [
      { word: 'evening', strongs: 'H6153' },
      { word: 'morning', strongs: 'H1242' },
      { word: 'day', strongs: 'H3117' }
    ],
    'GEN:1:20': [
      { word: 'God', strongs: 'H430' },
      { word: 'said', strongs: 'H559' },
      { word: 'waters', strongs: 'H4325' },
      { word: 'living', strongs: 'H2416' },
      { word: 'creatures', strongs: 'H5315' },
      { word: 'earth', strongs: 'H776' },
      { word: 'expanse', strongs: 'H7549' },
      { word: 'heavens', strongs: 'H8064' }
    ],
    'GEN:1:21': [
      { word: 'God', strongs: 'H430' },
      { word: 'created', strongs: 'H1254' },
      { word: 'living', strongs: 'H2416' },
      { word: 'creature', strongs: 'H5315' },
      { word: 'waters', strongs: 'H4325' },
      { word: 'God', strongs: 'H430' },
      { word: 'saw', strongs: 'H7200' },
      { word: 'good', strongs: 'H2896' }
    ],
    'GEN:1:22': [
      { word: 'God', strongs: 'H430' },
      { word: 'blessed', strongs: 'H1288' },
      { word: 'saying', strongs: 'H559' },
      { word: 'waters', strongs: 'H4325' },
      { word: 'earth', strongs: 'H776' }
    ],
    'GEN:1:23': [
      { word: 'evening', strongs: 'H6153' },
      { word: 'morning', strongs: 'H1242' },
      { word: 'day', strongs: 'H3117' }
    ],
    'GEN:1:24': [
      { word: 'God', strongs: 'H430' },
      { word: 'said', strongs: 'H559' },
      { word: 'earth', strongs: 'H776' },
      { word: 'living', strongs: 'H2416' },
      { word: 'creatures', strongs: 'H5315' },
      { word: 'earth', strongs: 'H776' }
    ],
    'GEN:1:25': [
      { word: 'God', strongs: 'H430' },
      { word: 'made', strongs: 'H6213' },
      { word: 'earth', strongs: 'H776' },
      { word: 'God', strongs: 'H430' },
      { word: 'saw', strongs: 'H7200' },
      { word: 'good', strongs: 'H2896' }
    ],
    'GEN:1:26': [
      { word: 'God', strongs: 'H430' },
      { word: 'said', strongs: 'H559' },
      { word: 'man', strongs: 'H120' },
      { word: 'image', strongs: 'H6754' },
      { word: 'heavens', strongs: 'H8064' },
      { word: 'earth', strongs: 'H776' },
      { word: 'earth', strongs: 'H776' }
    ],
    'GEN:1:27': [
      { word: 'God', strongs: 'H430' },
      { word: 'created', strongs: 'H1254' },
      { word: 'man', strongs: 'H120' },
      { word: 'image', strongs: 'H6754' },
      { word: 'God', strongs: 'H430' },
      { word: 'created', strongs: 'H1254' },
      { word: 'created', strongs: 'H1254' }
    ],
    'GEN:1:28': [
      { word: 'God', strongs: 'H430' },
      { word: 'blessed', strongs: 'H1288' },
      { word: 'God', strongs: 'H430' },
      { word: 'said', strongs: 'H559' },
      { word: 'earth', strongs: 'H776' },
      { word: 'heavens', strongs: 'H8064' },
      { word: 'living', strongs: 'H2416' },
      { word: 'earth', strongs: 'H776' }
    ],
    'GEN:1:29': [
      { word: 'God', strongs: 'H430' },
      { word: 'said', strongs: 'H559' },
      { word: 'earth', strongs: 'H776' }
    ],
    'GEN:1:30': [
      { word: 'earth', strongs: 'H776' },
      { word: 'heavens', strongs: 'H8064' },
      { word: 'earth', strongs: 'H776' },
      { word: 'breath', strongs: 'H5397' },
      { word: 'life', strongs: 'H2416' }
    ],
    'GEN:1:31': [
      { word: 'God', strongs: 'H430' },
      { word: 'saw', strongs: 'H7200' },
      { word: 'made', strongs: 'H6213' },
      { word: 'good', strongs: 'H2896' },
      { word: 'evening', strongs: 'H6153' },
      { word: 'morning', strongs: 'H1242' },
      { word: 'day', strongs: 'H3117' }
    ],
    'GEN:2:1': [
      { word: 'heavens', strongs: 'H8064' },
      { word: 'earth', strongs: 'H776' },
      { word: 'finished', strongs: 'H3615' },
      { word: 'host', strongs: 'H6635' }
    ],
    'GEN:2:2': [
      { word: 'seventh', strongs: 'H7637' },
      { word: 'day', strongs: 'H3117' },
      { word: 'God', strongs: 'H430' },
      { word: 'finished', strongs: 'H3615' },
      { word: 'work', strongs: 'H4399' },
      { word: 'rested', strongs: 'H7673' },
      { word: 'seventh', strongs: 'H7637' },
      { word: 'day', strongs: 'H3117' },
      { word: 'work', strongs: 'H4399' }
    ],
    'GEN:2:3': [
      { word: 'God', strongs: 'H430' },
      { word: 'blessed', strongs: 'H1288' },
      { word: 'seventh', strongs: 'H7637' },
      { word: 'day', strongs: 'H3117' },
      { word: 'made', strongs: 'H6213' },
      { word: 'God', strongs: 'H430' },
      { word: 'rested', strongs: 'H7673' },
      { word: 'work', strongs: 'H4399' }
    ],
    'GEN:2:4': [
      { word: 'heavens', strongs: 'H8064' },
      { word: 'earth', strongs: 'H776' },
      { word: 'created', strongs: 'H1254' },
      { word: 'day', strongs: 'H3117' },
      { word: 'LORD', strongs: 'H3068' },
      { word: 'God', strongs: 'H430' },
      { word: 'made', strongs: 'H6213' },
      { word: 'earth', strongs: 'H776' },
      { word: 'heavens', strongs: 'H8064' }
    ],
    'GEN:2:5': [
      { word: 'LORD', strongs: 'H3068' },
      { word: 'God', strongs: 'H430' },
      { word: 'man', strongs: 'H120' },
      { word: 'ground', strongs: 'H127' }
    ],
    'GEN:2:6': [
      { word: 'ground', strongs: 'H127' }
    ],
    'GEN:2:7': [
      { word: 'LORD', strongs: 'H3068' },
      { word: 'God', strongs: 'H430' },
      { word: 'formed', strongs: 'H3335' },
      { word: 'man', strongs: 'H120' },
      { word: 'dust', strongs: 'H6083' },
      { word: 'ground', strongs: 'H127' },
      { word: 'breath', strongs: 'H5397' },
      { word: 'life', strongs: 'H2416' },
      { word: 'man', strongs: 'H120' },
      { word: 'living', strongs: 'H2416' },
      { word: 'creature', strongs: 'H5315' }
    ],
    'GEN:2:8': [
      { word: 'LORD', strongs: 'H3068' },
      { word: 'God', strongs: 'H430' },
      { word: 'garden', strongs: 'H1588' },
      { word: 'Eden', strongs: 'H5731' },
      { word: 'man', strongs: 'H120' },
      { word: 'formed', strongs: 'H3335' }
    ],
    'GEN:2:9': [
      { word: 'ground', strongs: 'H127' },
      { word: 'LORD', strongs: 'H3068' },
      { word: 'God', strongs: 'H430' },
      { word: 'made', strongs: 'H6213' },
      { word: 'tree', strongs: 'H6086' },
      { word: 'good', strongs: 'H2896' },
      { word: 'tree', strongs: 'H6086' },
      { word: 'life', strongs: 'H2416' },
      { word: 'garden', strongs: 'H1588' },
      { word: 'tree', strongs: 'H6086' },
      { word: 'good', strongs: 'H2896' }
    ],
    'GEN:2:10': [
      { word: 'river', strongs: 'H5104' },
      { word: 'Eden', strongs: 'H5731' },
      { word: 'garden', strongs: 'H1588' },
      { word: 'rivers', strongs: 'H5104' }
    ],
    'GEN:2:12': [
      { word: 'good', strongs: 'H2896' }
    ],
    'GEN:2:13': [
      { word: 'river', strongs: 'H5104' }
    ],
    'GEN:2:14': [
      { word: 'river', strongs: 'H5104' },
      { word: 'river', strongs: 'H5104' }
    ],
    'GEN:2:15': [
      { word: 'LORD', strongs: 'H3068' },
      { word: 'God', strongs: 'H430' },
      { word: 'man', strongs: 'H120' },
      { word: 'garden', strongs: 'H1588' },
      { word: 'Eden', strongs: 'H5731' }
    ],
    'GEN:2:16': [
      { word: 'LORD', strongs: 'H3068' },
      { word: 'God', strongs: 'H430' },
      { word: 'man', strongs: 'H120' },
      { word: 'saying', strongs: 'H559' },
      { word: 'tree', strongs: 'H6086' },
      { word: 'garden', strongs: 'H1588' }
    ],
    'GEN:2:17': [
      { word: 'tree', strongs: 'H6086' },
      { word: 'good', strongs: 'H2896' },
      { word: 'day', strongs: 'H3117' }
    ],
    'GEN:2:18': [
      { word: 'LORD', strongs: 'H3068' },
      { word: 'God', strongs: 'H430' },
      { word: 'said', strongs: 'H559' },
      { word: 'good', strongs: 'H2896' },
      { word: 'man', strongs: 'H120' }
    ],
    'GEN:2:19': [
      { word: 'ground', strongs: 'H127' },
      { word: 'LORD', strongs: 'H3068' },
      { word: 'God', strongs: 'H430' },
      { word: 'formed', strongs: 'H3335' },
      { word: 'heavens', strongs: 'H8064' },
      { word: 'man', strongs: 'H120' },
      { word: 'man', strongs: 'H120' },
      { word: 'living', strongs: 'H2416' },
      { word: 'creature', strongs: 'H5315' }
    ],
    'GEN:2:20': [
      { word: 'man', strongs: 'H120' },
      { word: 'heavens', strongs: 'H8064' }
    ],
    'GEN:2:21': [
      { word: 'LORD', strongs: 'H3068' },
      { word: 'God', strongs: 'H430' },
      { word: 'man', strongs: 'H120' },
      { word: 'ribs', strongs: 'H6763' },
      { word: 'flesh', strongs: 'H1320' }
    ],
    'GEN:2:22': [
      { word: 'rib', strongs: 'H6763' },
      { word: 'LORD', strongs: 'H3068' },
      { word: 'God', strongs: 'H430' },
      { word: 'man', strongs: 'H120' },
      { word: 'made', strongs: 'H6213' },
      { word: 'woman', strongs: 'H802' },
      { word: 'man', strongs: 'H120' }
    ],
    'GEN:2:23': [
      { word: 'man', strongs: 'H120' },
      { word: 'said', strongs: 'H559' },
      { word: 'bone', strongs: 'H6106' },
      { word: 'bones', strongs: 'H6106' },
      { word: 'flesh', strongs: 'H1320' },
      { word: 'flesh', strongs: 'H1320' },
      { word: 'Woman', strongs: 'H802' },
      { word: 'Man', strongs: 'H376' }
    ],
    'GEN:2:24': [
      { word: 'man', strongs: 'H376' },
      { word: 'wife', strongs: 'H802' },
      { word: 'flesh', strongs: 'H1320' }
    ],
    'GEN:2:25': [
      { word: 'man', strongs: 'H120' },
      { word: 'wife', strongs: 'H802' },
      { word: 'naked', strongs: 'H6174' }
    ]
  };

  root.StrongsData = { DICTIONARY, ALIGNMENT };
})(typeof globalThis !== 'undefined' ? globalThis : this);
