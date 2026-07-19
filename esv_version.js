/**
 * esv_version.js
 * SermonNotes Bible Translation Engine
 * Exposes a global BibleEngine namespace with the ESV translation structure,
 * dynamic translation registration, and verse lookup utilities.
 *
 * Usage (script tag): window.BibleEngine is available globally.
 * Usage (ES module): import { BibleEngine } from './esv_version.js'
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.BibleEngine = factory();
  }
}(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  /* ─────────────────────────────────────────────────────────────────────────
     CANONICAL BOOK LIST  (66 books, chapter counts, standard abbreviations)
  ───────────────────────────────────────────────────────────────────────── */
  const CANON = {
    OT: [
      { id: 'GEN', name: 'Genesis',        abbr: 'Gen',   chapters: 50,  division: 'Law' },
      { id: 'EXO', name: 'Exodus',         abbr: 'Exo',   chapters: 40,  division: 'Law' },
      { id: 'LEV', name: 'Leviticus',      abbr: 'Lev',   chapters: 27,  division: 'Law' },
      { id: 'NUM', name: 'Numbers',        abbr: 'Num',   chapters: 36,  division: 'Law' },
      { id: 'DEU', name: 'Deuteronomy',    abbr: 'Deu',   chapters: 34,  division: 'Law' },
      { id: 'JOS', name: 'Joshua',         abbr: 'Jos',   chapters: 24,  division: 'History' },
      { id: 'JDG', name: 'Judges',         abbr: 'Jdg',   chapters: 21,  division: 'History' },
      { id: 'RUT', name: 'Ruth',           abbr: 'Rut',   chapters: 4,   division: 'History' },
      { id: '1SA', name: '1 Samuel',       abbr: '1Sa',   chapters: 31,  division: 'History' },
      { id: '2SA', name: '2 Samuel',       abbr: '2Sa',   chapters: 24,  division: 'History' },
      { id: '1KI', name: '1 Kings',        abbr: '1Ki',   chapters: 22,  division: 'History' },
      { id: '2KI', name: '2 Kings',        abbr: '2Ki',   chapters: 25,  division: 'History' },
      { id: '1CH', name: '1 Chronicles',   abbr: '1Ch',   chapters: 29,  division: 'History' },
      { id: '2CH', name: '2 Chronicles',   abbr: '2Ch',   chapters: 36,  division: 'History' },
      { id: 'EZR', name: 'Ezra',           abbr: 'Ezr',   chapters: 10,  division: 'History' },
      { id: 'NEH', name: 'Nehemiah',       abbr: 'Neh',   chapters: 13,  division: 'History' },
      { id: 'EST', name: 'Esther',         abbr: 'Est',   chapters: 10,  division: 'History' },
      { id: 'JOB', name: 'Job',            abbr: 'Job',   chapters: 42,  division: 'Wisdom' },
      { id: 'PSA', name: 'Psalms',         abbr: 'Psa',   chapters: 150, division: 'Wisdom' },
      { id: 'PRO', name: 'Proverbs',       abbr: 'Pro',   chapters: 31,  division: 'Wisdom' },
      { id: 'ECC', name: 'Ecclesiastes',   abbr: 'Ecc',   chapters: 12,  division: 'Wisdom' },
      { id: 'SNG', name: 'Song of Solomon',abbr: 'Sng',   chapters: 8,   division: 'Wisdom' },
      { id: 'ISA', name: 'Isaiah',         abbr: 'Isa',   chapters: 66,  division: 'Major Prophets' },
      { id: 'JER', name: 'Jeremiah',       abbr: 'Jer',   chapters: 52,  division: 'Major Prophets' },
      { id: 'LAM', name: 'Lamentations',   abbr: 'Lam',   chapters: 5,   division: 'Major Prophets' },
      { id: 'EZK', name: 'Ezekiel',        abbr: 'Ezk',   chapters: 48,  division: 'Major Prophets' },
      { id: 'DAN', name: 'Daniel',         abbr: 'Dan',   chapters: 12,  division: 'Major Prophets' },
      { id: 'HOS', name: 'Hosea',          abbr: 'Hos',   chapters: 14,  division: 'Minor Prophets' },
      { id: 'JOL', name: 'Joel',           abbr: 'Jol',   chapters: 3,   division: 'Minor Prophets' },
      { id: 'AMO', name: 'Amos',           abbr: 'Amo',   chapters: 9,   division: 'Minor Prophets' },
      { id: 'OBA', name: 'Obadiah',        abbr: 'Oba',   chapters: 1,   division: 'Minor Prophets' },
      { id: 'JON', name: 'Jonah',          abbr: 'Jon',   chapters: 4,   division: 'Minor Prophets' },
      { id: 'MIC', name: 'Micah',          abbr: 'Mic',   chapters: 7,   division: 'Minor Prophets' },
      { id: 'NAH', name: 'Nahum',          abbr: 'Nah',   chapters: 3,   division: 'Minor Prophets' },
      { id: 'HAB', name: 'Habakkuk',       abbr: 'Hab',   chapters: 3,   division: 'Minor Prophets' },
      { id: 'ZEP', name: 'Zephaniah',      abbr: 'Zep',   chapters: 3,   division: 'Minor Prophets' },
      { id: 'HAG', name: 'Haggai',         abbr: 'Hag',   chapters: 2,   division: 'Minor Prophets' },
      { id: 'ZEC', name: 'Zechariah',      abbr: 'Zec',   chapters: 14,  division: 'Minor Prophets' },
      { id: 'MAL', name: 'Malachi',        abbr: 'Mal',   chapters: 4,   division: 'Minor Prophets' },
    ],
    NT: [
      { id: 'MAT', name: 'Matthew',        abbr: 'Mat',   chapters: 28,  division: 'Gospels' },
      { id: 'MRK', name: 'Mark',           abbr: 'Mrk',   chapters: 16,  division: 'Gospels' },
      { id: 'LUK', name: 'Luke',           abbr: 'Luk',   chapters: 24,  division: 'Gospels' },
      { id: 'JHN', name: 'John',           abbr: 'Jhn',   chapters: 21,  division: 'Gospels' },
      { id: 'ACT', name: 'Acts',           abbr: 'Act',   chapters: 28,  division: 'History' },
      { id: 'ROM', name: 'Romans',         abbr: 'Rom',   chapters: 16,  division: 'Pauline Epistles' },
      { id: '1CO', name: '1 Corinthians',  abbr: '1Co',   chapters: 16,  division: 'Pauline Epistles' },
      { id: '2CO', name: '2 Corinthians',  abbr: '2Co',   chapters: 13,  division: 'Pauline Epistles' },
      { id: 'GAL', name: 'Galatians',      abbr: 'Gal',   chapters: 6,   division: 'Pauline Epistles' },
      { id: 'EPH', name: 'Ephesians',      abbr: 'Eph',   chapters: 6,   division: 'Pauline Epistles' },
      { id: 'PHP', name: 'Philippians',    abbr: 'Php',   chapters: 4,   division: 'Pauline Epistles' },
      { id: 'COL', name: 'Colossians',     abbr: 'Col',   chapters: 4,   division: 'Pauline Epistles' },
      { id: '1TH', name: '1 Thessalonians',abbr: '1Th',   chapters: 5,   division: 'Pauline Epistles' },
      { id: '2TH', name: '2 Thessalonians',abbr: '2Th',   chapters: 3,   division: 'Pauline Epistles' },
      { id: '1TI', name: '1 Timothy',      abbr: '1Ti',   chapters: 6,   division: 'Pauline Epistles' },
      { id: '2TI', name: '2 Timothy',      abbr: '2Ti',   chapters: 4,   division: 'Pauline Epistles' },
      { id: 'TIT', name: 'Titus',          abbr: 'Tit',   chapters: 3,   division: 'Pauline Epistles' },
      { id: 'PHM', name: 'Philemon',       abbr: 'Phm',   chapters: 1,   division: 'Pauline Epistles' },
      { id: 'HEB', name: 'Hebrews',        abbr: 'Heb',   chapters: 13,  division: 'General Epistles' },
      { id: 'JAS', name: 'James',          abbr: 'Jas',   chapters: 5,   division: 'General Epistles' },
      { id: '1PE', name: '1 Peter',        abbr: '1Pe',   chapters: 5,   division: 'General Epistles' },
      { id: '2PE', name: '2 Peter',        abbr: '2Pe',   chapters: 3,   division: 'General Epistles' },
      { id: '1JN', name: '1 John',         abbr: '1Jn',   chapters: 5,   division: 'General Epistles' },
      { id: '2JN', name: '2 John',         abbr: '2Jn',   chapters: 1,   division: 'General Epistles' },
      { id: '3JN', name: '3 John',         abbr: '3Jn',   chapters: 1,   division: 'General Epistles' },
      { id: 'JUD', name: 'Jude',           abbr: 'Jud',   chapters: 1,   division: 'General Epistles' },
      { id: 'REV', name: 'Revelation',     abbr: 'Rev',   chapters: 22,  division: 'Prophecy' },
    ]
  };

  /* Ordered division names per testament, used for grouped UI rendering */
  const DIVISIONS = {
    OT: ['Law', 'History', 'Wisdom', 'Major Prophets', 'Minor Prophets'],
    NT: ['Gospels', 'History', 'Pauline Epistles', 'General Epistles', 'Prophecy']
  };

  /* ─────────────────────────────────────────────────────────────────────────
     VERSE COUNT TABLE  (verses per chapter, keyed by bookId)
     Source: standard Protestant canon verse counts.
  ───────────────────────────────────────────────────────────────────────── */
  const VERSE_COUNTS = {
    GEN:[31,25,24,26,32,22,24,22,29,32,32,20,18,24,21,16,27,33,38,18,34,24,20,67,34,35,46,22,35,43,55,32,20,31,29,43,36,30,23,23,57,38,34,34,28,34,31,22,33,26],
    EXO:[22,25,22,31,23,30,25,32,35,29,10,51,22,31,27,36,16,27,25,26,36,31,33,18,40,37,21,43,46,38,18,35,23,35,35,38,29,31,43,38],
    LEV:[17,16,17,35,19,30,38,36,24,20,47,8,59,57,33,34,16,30,24,33,3,49,12,22,23,34,15,38,22,38,18,20,40,52,28,28,27,27],
    NUM:[54,34,51,49,31,27,89,26,23,36,35,16,33,45,41,50,13,32,22,29,35,41,30,25,18,65,23,31,39,17,54,42,56,29,34,13],
    DEU:[46,37,29,49,33,25,26,20,29,22,32,32,18,29,23,22,20,22,21,20,23,30,25,22,19,19,26,68,29,20,30,52,29,12],
    JOS:[18,24,17,24,15,27,26,35,27,43,23,24,33,15,63,10,18,28,51,9,45,34,16,33],
    JDG:[36,23,31,24,31,40,25,35,57,18,40,15,25,20,20,31,13,31,30,48,25],
    RUT:[22,23,18,22],
    '1SA':[28,36,21,22,12,21,17,22,27,27,15,25,23,52,35,23,58,30,24,42,15,23,29,22,44,25,12,25,11,31,13],
    '2SA':[27,32,39,12,25,23,29,18,13,19,27,31,39,33,37,23,29,33,43,26,22,51,39,25],
    '1KI':[53,46,28,34,18,38,51,66,28,29,43,33,34,31,34,34,24,46,21,43,29,53],
    '2KI':[18,25,27,44,27,33,20,29,37,36,21,21,25,29,38,20,41,37,37,21,26,20,37,20,30],
    '1CH':[54,55,24,43,26,81,40,40,44,14,47,40,14,17,29,43,27,17,19,8,30,19,32,31,31,32,34,21,30],
    '2CH':[17,18,17,22,14,42,22,18,31,19,23,16,22,15,19,14,19,34,11,37,20,12,21,27,28,23,9,27,36,27,21,33,25,33,27,23],
    EZR:[11,70,13,24,17,22,28,36,15,44],
    NEH:[11,20,32,23,19,19,73,18,38,39,36,47,31],
    EST:[22,28,23,31,10,16,23,21,13,29,33,9],
    JOB:[22,13,26,21,27,30,21,22,35,22,20,25,28,22,35,22,16,21,29,29,34,30,17,25,6,14,23,28,25,31,40,22,33,37,16,33,24,41,30,24,34,17],
    PSA:[6,12,8,8,12,10,17,9,20,18,7,8,6,7,5,11,15,50,14,9,13,31,6,10,22,12,14,9,11,12,24,11,22,22,28,12,40,22,13,17,13,11,5,20,28,22,35,22,20,43,11,13,5,26,17,11,11,21,22,25,25,38,40,22,12,22,18,30,21,9,49,22,68,55,19,11,21,22,30,14,9,22,11,26,25,6,22,8,11,13,23,24,16,13,11,3,12,15,16,11,16,11,15,19,26,19,14,6,19,14,8,12,11,18,14,11,13,19,6,11,22,12,14,9,12,18,14,16,16,12,10,12,8,19,13,12,16,9,21,25,19,13,21,25,25,8,26,16,13,21,22,21,6,18,22,14,13,19,15,17,5,26,16,19,19,21,6,22,23,23,22,16,11,21,23,14,22,14,18,16,14,18,14,15,11,23,21,17,15,8,11,11,8,9,11,14,23,10,18,23,22,4,11,14,8,20,12,9,11,12,7,9,20,7,23,15,13,24],
    PRO:[33,22,35,27,23,35,27,36,18,32,31,28,25,35,33,33,28,24,29,30,31,29,35,34,28,28,27,28,62,35,30],
    ECC:[18,26,22,17,19,12,29,17,18,20,10,14],
    SNG:[17,17,11,16,16,13,13,14],
    ISA:[31,22,26,6,30,13,25,22,21,34,16,6,22,32,9,14,14,7,25,6,17,25,18,23,12,21,13,29,24,33,9,20,24,17,10,22,38,22,8,31,29,25,28,28,25,13,15,22,26,11,23,15,12,17,13,12,21,14,21,22,11,12,19,12,25,24],
    JER:[19,37,25,31,31,30,34,22,26,25,23,17,27,22,21,21,27,23,15,18,14,30,40,10,38,24,22,17,32,24,40,44,26,22,19,32,21,28,18,16,18,22,13,30,5,28,7,47,39,46,64,34],
    LAM:[22,22,66,22,22],
    EZK:[28,10,27,17,17,14,27,18,11,22,25,28,23,23,8,63,24,32,14,49,32,31,49,27,17,21,36,26,21,26,18,32,33,31,15,38,28,23,29,49,26,20,27,31,25,24,23,35],
    DAN:[21,49,30,37,31,28,28,27,27,21,45,13],
    HOS:[11,23,5,19,15,11,16,14,17,15,12,14,16,9],
    JOL:[20,32,21],
    AMO:[15,16,15,13,27,14,17,14,15],
    OBA:[21],
    JON:[17,10,10,11],
    MIC:[16,13,12,13,15,16,20],
    NAH:[15,13,19],
    HAB:[17,20,19],
    ZEP:[18,15,20],
    HAG:[15,23],
    ZEC:[21,13,10,14,11,15,14,23,17,12,17,14,9,21],
    MAL:[14,17,18,6],
    MAT:[25,23,17,25,48,34,29,34,38,42,30,50,58,36,39,28,27,35,30,34,46,46,39,51,46,75,66,20],
    MRK:[45,28,35,41,43,56,37,38,50,52,33,44,37,72,47,20],
    LUK:[80,52,38,44,39,49,50,56,62,42,54,59,35,35,32,31,37,43,48,47,38,71,56,53],
    JHN:[51,25,36,54,47,71,53,59,41,42,57,50,38,31,27,33,26,40,42,31,25],
    ACT:[26,47,26,37,42,15,60,40,43,48,30,25,52,28,41,40,34,28,41,38,40,30,35,27,27,32,44,31],
    ROM:[32,29,31,25,21,23,25,39,33,21,36,21,14,26,33,24],
    '1CO':[31,16,23,21,13,20,40,34,16,30,20,50,40,21,51,64],
    '2CO':[24,17,18,18,21,18,16,24,15,18,33,21,14],
    GAL:[24,21,29,31,26,18],
    EPH:[23,22,21,28,30,14],
    PHP:[29,23,25,18],
    COL:[29,23,11,14],
    '1TH':[10,20,13,18,28],
    '2TH':[12,17,18],
    '1TI':[20,15,16,16,25,21],
    '2TI':[18,26,17,22],
    TIT:[16,15,15],
    PHM:[25],
    HEB:[14,18,19,16,14,20,28,13,28,39,40,29,25],
    JAS:[27,26,18,17,20],
    '1PE':[25,25,22,19,14],
    '2PE':[21,22,18],
    '1JN':[10,29,24,21,21],
    '2JN':[13],
    '3JN':[15],
    JUD:[25],
    REV:[20,29,22,11,14,17,17,13,21,11,19,17,18,20,8,21,18,24,21,15,27,21]
  };

  /* ─────────────────────────────────────────────────────────────────────────
     SAMPLE VERSE DATA  – representative ESV-style text for key passages.
     Full implementation would include all 31,102 verses; this engine
     provides the scaffold and lookup API. Developers can hydrate via
     registerVerseData() or load from a companion payload file.
  ───────────────────────────────────────────────────────────────────────── */
  const ESV_VERSES = {
    'GEN:1': {
      1: "In the beginning, God created the heavens and the earth.",
      2: "The earth was without form and void, and darkness was over the face of the deep. And the Spirit of God was hovering over the face of the waters.",
      3: "And God said, \"Let there be light,\" and there was light.",
      4: "And God saw that the light was good. And God separated the light from the darkness.",
      5: "God called the light Day, and the darkness he called Night. And there was evening and there was morning, the first day.",
      6: "And God said, \"Let there be an expanse in the midst of the waters, and let it separate the waters from the waters.\"",
      7: "And God made the expanse and separated the waters that were under the expanse from the waters that were above the expanse. And it was so.",
      8: "And God called the expanse Heaven. And there was evening and there was morning, the second day.",
      9: "And God said, \"Let the waters under the heavens be gathered together into one place, and let the dry land appear.\" And it was so.",
      10: "God called the dry land Earth, and the waters that were gathered together he called Seas. And God saw that it was good.",
      26: "Then God said, \"Let us make man in our image, after our likeness. And let them have dominion over the fish of the sea and over the birds of the heavens and over the livestock and over all the earth and over every creeping thing that creeps on the earth.\"",
      27: "So God created man in his own image, in the image of God he created him; male and female he created them.",
      28: "And God blessed them. And God said to them, \"Be fruitful and multiply and fill the earth and subdue it, and have dominion over the fish of the sea and over the birds of the heavens and over every living thing that moves on the earth.\"",
      31: "And God saw everything that he had made, and behold, it was very good. And there was evening and there was morning, the sixth day."
    },
    'JHN:3': {
      1: "Now there was a man of the Pharisees named Nicodemus, a ruler of the Jews.",
      2: "This man came to Jesus by night and said to him, \"Rabbi, we know that you are a teacher come from God, for no one can do these signs that you do unless God is with him.\"",
      3: "Jesus answered him, \"Truly, truly, I say to you, unless one is born again he cannot see the kingdom of God.\"",
      14: "And as Moses lifted up the serpent in the wilderness, so must the Son of Man be lifted up,",
      15: "that whoever believes in him may have eternal life.",
      16: "\"For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life.",
      17: "For God did not send his Son into the world to condemn the world, but in order that the world might be saved through him.",
      36: "Whoever believes in the Son has eternal life; whoever does not obey the Son shall not see life, but the wrath of God remains on him."
    },
    'PSA:23': {
      1: "The LORD is my shepherd; I shall not want.",
      2: "He makes me lie down in green pastures. He leads me beside still waters.",
      3: "He restores my soul. He leads me in paths of righteousness for his name's sake.",
      4: "Even though I walk through the valley of the shadow of death, I will fear no evil, for you are with me; your rod and your staff, they comfort me.",
      5: "You prepare a table before me in the presence of my enemies; you anoint my head with oil; my cup overflows.",
      6: "Surely goodness and mercy shall follow me all the days of my life, and I shall dwell in the house of the LORD forever."
    },
    'ROM:8': {
      1: "There is therefore now no condemnation for those who are in Christ Jesus.",
      28: "And we know that for those who love God all things work together for good, for those who are called according to his purpose.",
      38: "For I am sure that neither death nor life, nor angels nor rulers, nor things present nor things to come, nor powers,",
      39: "nor height nor depth, nor anything else in all creation, will be able to separate us from the love of God in Christ Jesus our Lord."
    },
    'PHP:4': {
      4: "Rejoice in the Lord always; again I will say, rejoice.",
      6: "do not be anxious about anything, but in everything by prayer and supplication with thanksgiving let your requests be made known to God.",
      7: "And the peace of God, which surpasses all understanding, will guard your hearts and your minds in Christ Jesus.",
      13: "I can do all things through him who strengthens me."
    },
    'ISA:40': {
      28: "Have you not known? Have you not heard? The LORD is the everlasting God, the Creator of the ends of the earth. He does not faint or grow weary; his understanding is unsearchable.",
      29: "He gives power to the faint, and to him who has no might he increases strength.",
      30: "Even youths shall faint and be weary, and young men shall fall exhausted;",
      31: "but they who wait for the LORD shall renew their strength; they shall mount up with wings like eagles; they shall run and not be weary; they shall walk and not faint."
    },
    'MAT:5': {
      3: "\"Blessed are the poor in spirit, for theirs is the kingdom of heaven.",
      4: "\"Blessed are those who mourn, for they shall be comforted.",
      5: "\"Blessed are the meek, for they shall inherit the earth.",
      6: "\"Blessed are those who hunger and thirst for righteousness, for they shall be satisfied.",
      7: "\"Blessed are the merciful, for they shall receive mercy.",
      8: "\"Blessed are the pure in heart, for they shall see God.",
      9: "\"Blessed are the peacemakers, for they shall be called sons of God.",
      14: "\"You are the light of the world. A city set on a hill cannot be hidden.",
      16: "In the same way, let your light shine before others, so that they may see your good works and give glory to your Father who is in heaven."
    },
    'EPH:2': {
      8: "For by grace you have been saved through faith. And this is not your own doing; it is the gift of God,",
      9: "not a result of works, so that no one may boast.",
      10: "For we are his workmanship, created in Christ Jesus for good works, which God prepared beforehand, that we should walk in them."
    },
    'HEB:11': {
      1: "Now faith is the assurance of things hoped for, the conviction of things not seen.",
      6: "And without faith it is impossible to please him, for whoever would draw near to God must believe that he exists and that he rewards those who seek him."
    },
    'REV:21': {
      1: "Then I saw a new heaven and a new earth, for the first heaven and the first earth had passed away, and the sea was no more.",
      4: "He will wipe away every tear from their eyes, and death shall be no more, neither shall there be mourning, nor crying, nor pain anymore, for the former things have passed away.",
      5: "And he who was seated on the throne said, \"Behold, I am making all things new.\" Also he said, \"Write this down, for these words are trustworthy and true.\""
    }
  };

  /* ─────────────────────────────────────────────────────────────────────────
     TRANSLATION REGISTRY
  ───────────────────────────────────────────────────────────────────────── */
  const _translations = {
    ESV: {
      id: 'ESV',
      name: 'English Standard Version',
      shortName: 'ESV',
      language: 'en',
      direction: 'ltr',
      year: 2001,
      publisher: 'Crossway',
      verses: ESV_VERSES,
      active: true
    }
  };

  let _activeTranslation = 'ESV';

  /* ─────────────────────────────────────────────────────────────────────────
     HELPER: build a placeholder chapter for books without full verse data
  ───────────────────────────────────────────────────────────────────────── */
  function _buildPlaceholderChapter(bookId, chapter) {
    const book = getAllBooks().find(b => b.id === bookId);
    const counts = VERSE_COUNTS[bookId];
    if (!counts || !counts[chapter - 1]) return {};
    const verseCount = counts[chapter - 1];
    const result = {};
    for (let v = 1; v <= verseCount; v++) {
      result[v] = `[${book ? book.name : bookId} ${chapter}:${v} — ${_activeTranslation} text not yet loaded. Use registerVerseData() to hydrate this passage.]`;
    }
    return result;
  }

  /* ─────────────────────────────────────────────────────────────────────────
     PUBLIC API
  ───────────────────────────────────────────────────────────────────────── */

  /** Return all 66 books flat */
  function getAllBooks() {
    return [...CANON.OT, ...CANON.NT];
  }

  /** Return OT or NT book list */
  function getTestament(testament) {
    return testament === 'NT' ? [...CANON.NT] : [...CANON.OT];
  }

  /** Return the ordered list of division names for a testament ('OT' | 'NT') */
  function getDivisions(testament) {
    return testament === 'NT' ? [...DIVISIONS.NT] : [...DIVISIONS.OT];
  }

  /**
   * Return a testament's books grouped by division, in canonical order.
   * Returns an array of { division: String, books: [...] }
   */
  function getTestamentGrouped(testament) {
    const books = getTestament(testament);
    const order = getDivisions(testament);
    return order.map(division => ({
      division,
      books: books.filter(b => b.division === division)
    }));
  }

  /** Find a single book by ID, name, or abbreviation (case-insensitive) */
  function findBook(query) {
    const q = String(query).toLowerCase();
    return getAllBooks().find(
      b => b.id.toLowerCase() === q || b.name.toLowerCase() === q || b.abbr.toLowerCase() === q
    ) || null;
  }

  /** Return chapter count for a given book */
  function getChapterCount(bookId) {
    const book = findBook(bookId);
    return book ? book.chapters : 0;
  }

  /** Return verse count for a given book + chapter */
  function getVerseCount(bookId, chapter) {
    const book = findBook(bookId);
    if (!book) return 0;
    const counts = VERSE_COUNTS[book.id];
    return counts ? (counts[chapter - 1] || 0) : 0;
  }

  /* ─────────────────────────────────────────────────────────────────────────
     ESV LIVE API  (api.esv.org)
     Crossway's free non-commercial API. Per their terms, we do NOT persist
     the fetched text beyond a single in-memory "last chapter" cache — this
     app is a live lookup client, not a bulk offline copy of the ESV.
     Register your own key via BibleEngine.configureESVApi({ apiKey }).
  ───────────────────────────────────────────────────────────────────────── */
  const ESV_COPYRIGHT =
    'Scripture quotations are from the ESV® Bible (The Holy Bible, English Standard ' +
    'Version®), copyright © 2001 by Crossway, a publishing ministry of Good News ' +
    'Publishers. Used by permission. All rights reserved.';

  const _esvApi = {
    apiKey: null,
    endpoint: 'https://api.esv.org/v3/passage/text/'
  };

  // Holds AT MOST one chapter's worth of fetched verses at a time.
  let _liveCache = { key: null, verses: null };

  function configureESVApi({ apiKey } = {}) {
    _esvApi.apiKey = apiKey || null;
    return BibleEngine;
  }

  function hasESVApiKey() {
    return !!_esvApi.apiKey;
  }

  /** Parse the ESV API's "[1] text [2] text" verse-numbered string into { n: text } */
  function _parseESVPassageText(raw) {
    const cleaned = raw
      .replace(/\s*\(ESV\)\s*$/m, '')   // strip trailing short copyright tag if present
      .trim();
    const parts = cleaned.split(/\[(\d+)\]\s*/).filter(Boolean);
    const verses = {};
    for (let i = 0; i < parts.length; i += 2) {
      const num = parseInt(parts[i], 10);
      const text = (parts[i + 1] || '').trim();
      if (!isNaN(num) && text) verses[num] = text;
    }
    return verses;
  }

  /**
   * Fetch a chapter live from the ESV API.
   * Returns a Promise<Array<{ verse, text }>>.
   * Falls back to throwing if no API key is configured or the request fails —
   * callers should catch and fall back to getChapter() for offline/local data.
   */
  async function fetchChapterLive(bookId, chapter) {
    if (!_esvApi.apiKey) throw new Error('ESV API key not configured. Call configureESVApi({ apiKey }) first.');
    const book = findBook(bookId);
    if (!book) throw new Error(`Book "${bookId}" not found.`);

    const cacheKey = `${book.id}:${chapter}`;
    if (_liveCache.key === cacheKey && _liveCache.verses) {
      return _toVerseArray(book.id, chapter, _liveCache.verses);
    }

    const q = encodeURIComponent(`${book.name} ${chapter}`);
    const url = `${_esvApi.endpoint}?q=${q}&include-headings=false&include-footnotes=false` +
      `&include-verse-numbers=true&include-short-copyright=false&include-passage-references=false` +
      `&include-first-verse-numbers=true`;

    const res = await fetch(url, {
      headers: { 'Authorization': `Token ${_esvApi.apiKey}` }
    });
    if (!res.ok) throw new Error(`ESV API request failed: ${res.status} ${res.statusText}`);
    const data = await res.json();
    const passage = (data.passages && data.passages[0]) || '';
    const verses = _parseESVPassageText(passage);

    // Replace cache wholesale — never accumulate more than one chapter.
    _liveCache = { key: cacheKey, verses };

    return _toVerseArray(book.id, chapter, verses);
  }

  function _toVerseArray(bookId, chapter, verseMap) {
    const verseCount = getVerseCount(bookId, chapter);
    const result = [];
    for (let v = 1; v <= verseCount; v++) {
      result.push({ verse: v, text: verseMap[v] || `[verse ${v} unavailable from API response]` });
    }
    return result;
  }

  /**
   * Fetch a full chapter's verses.
   * Returns an array of { verse: Number, text: String } objects.
   */
  function getChapter(bookId, chapter, translationId) {
    const tid = translationId || _activeTranslation;
    const trans = _translations[tid];
    if (!trans) throw new Error(`Translation "${tid}" not registered.`);
    const book = findBook(bookId);
    if (!book) throw new Error(`Book "${bookId}" not found.`);
    const key = `${book.id}:${chapter}`;
    const raw = trans.verses[key] || _buildPlaceholderChapter(book.id, chapter);
    const verseCount = getVerseCount(book.id, chapter);
    const result = [];
    for (let v = 1; v <= verseCount; v++) {
      result.push({ verse: v, text: raw[v] || `[${book.name} ${chapter}:${v} — text pending]` });
    }
    return result;
  }

  /**
   * Fetch a single verse.
   * Returns { book, chapter, verse, text, reference, translation }
   */
  function getVerse(bookId, chapter, verse, translationId) {
    const tid = translationId || _activeTranslation;
    const trans = _translations[tid];
    if (!trans) throw new Error(`Translation "${tid}" not registered.`);
    const book = findBook(bookId);
    if (!book) throw new Error(`Book "${bookId}" not found.`);
    const key = `${book.id}:${chapter}`;
    const text = (trans.verses[key] && trans.verses[key][verse]) ||
      `[${book.name} ${chapter}:${verse} — text pending]`;
    return {
      book: book.name,
      bookId: book.id,
      chapter,
      verse,
      text,
      reference: `${book.name} ${chapter}:${verse}`,
      translation: tid
    };
  }

  /**
   * Register a new translation.
   * @param {Object} config - { id, name, shortName, language, direction, year, publisher, verses }
   */
  function registerTranslation(config) {
    if (!config.id || !config.verses) {
      throw new Error('registerTranslation requires at least { id, verses }.');
    }
    _translations[config.id] = {
      id: config.id,
      name: config.name || config.id,
      shortName: config.shortName || config.id,
      language: config.language || 'en',
      direction: config.direction || 'ltr',
      year: config.year || null,
      publisher: config.publisher || null,
      verses: config.verses,
      active: false
    };
    return BibleEngine;
  }

  /**
   * Add verse data to an existing translation (bulk hydration).
   * @param {String} translationId
   * @param {Object} versesPayload - { 'GEN:1': { 1: "...", 2: "..." }, ... }
   */
  function registerVerseData(translationId, versesPayload) {
    const tid = translationId || _activeTranslation;
    if (!_translations[tid]) throw new Error(`Translation "${tid}" not found.`);
    Object.assign(_translations[tid].verses, versesPayload);
    return BibleEngine;
  }

  /** Switch the active translation */
  function setActiveTranslation(translationId) {
    if (!_translations[translationId]) {
      throw new Error(`Translation "${translationId}" not registered.`);
    }
    _activeTranslation = translationId;
    Object.keys(_translations).forEach(k => { _translations[k].active = (k === translationId); });
    return BibleEngine;
  }

  /** Get the currently active translation id */
  function getActiveTranslation() {
    return _activeTranslation;
  }

  /** List all registered translations */
  function listTranslations() {
    return Object.values(_translations).map(t => ({
      id: t.id,
      name: t.name,
      shortName: t.shortName,
      language: t.language,
      active: t.active
    }));
  }

  /** Search across the active translation for a keyword */
  function search(query, translationId) {
    const tid = translationId || _activeTranslation;
    const trans = _translations[tid];
    if (!trans) return [];
    const q = query.toLowerCase();
    const results = [];
    Object.entries(trans.verses).forEach(([key, verses]) => {
      const [bookId, chapterStr] = key.split(':');
      const book = findBook(bookId);
      Object.entries(verses).forEach(([verseNum, text]) => {
        if (text.toLowerCase().includes(q)) {
          results.push({
            reference: `${book ? book.name : bookId} ${chapterStr}:${verseNum}`,
            bookId,
            chapter: parseInt(chapterStr),
            verse: parseInt(verseNum),
            text,
            translation: tid
          });
        }
      });
    });
    return results;
  }

  /** Format a canonical reference string */
  function formatReference(bookId, chapter, verse) {
    const book = findBook(bookId);
    if (!book) return `${bookId} ${chapter}:${verse}`;
    return verse ? `${book.name} ${chapter}:${verse}` : `${book.name} ${chapter}`;
  }

  /* ─────────────────────────────────────────────────────────────────────────
     PUBLIC NAMESPACE
  ───────────────────────────────────────────────────────────────────────── */
  const BibleEngine = {
    version: '1.0.0',
    CANON,
    DIVISIONS,
    VERSE_COUNTS,
    getAllBooks,
    getTestament,
    getDivisions,
    getTestamentGrouped,
    findBook,
    getChapterCount,
    getVerseCount,
    getChapter,
    getVerse,
    configureESVApi,
    hasESVApiKey,
    fetchChapterLive,
    ESV_COPYRIGHT,
    registerTranslation,
    registerVerseData,
    setActiveTranslation,
    getActiveTranslation,
    listTranslations,
    search,
    formatReference
  };

  return BibleEngine;
}));
