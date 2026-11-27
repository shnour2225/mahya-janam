import assert from 'node:assert/strict';
import { test } from 'node:test';
import { matchesTehranCode, normalizeAccessCode } from '../src/access-code.ts';

const atUtc = (time) => Date.parse(`2026-11-28T${time}Z`);

test('accepts the reversed Tehran hour and minute for the whole minute', () => {
  for (const time of ['15:27:00', '15:27:30', '15:27:59.999']) {
    assert.equal(matchesTehranCode('5718', atUtc(time)), true);
  }
  assert.equal(matchesTehranCode('1857', atUtc('15:27:30')), false);
});

test('rejects the previous code as soon as the minute changes', () => {
  assert.equal(matchesTehranCode('5718', atUtc('15:26:59.999')), false);
  assert.equal(matchesTehranCode('5718', atUtc('15:28:00')), false);
  assert.equal(matchesTehranCode('5818', atUtc('15:28:00')), true);
});

test('preserves leading zeros and handles Tehran midnight', () => {
  assert.equal(matchesTehranCode('0507', atUtc('03:35:00')), true);
  assert.equal(matchesTehranCode('5923', atUtc('20:29:59.999')), true);
  assert.equal(matchesTehranCode('5923', atUtc('20:30:00')), false);
  assert.equal(matchesTehranCode('0000', atUtc('20:30:00')), true);
});

test('accepts Persian and Arabic-Indic digits and rejects incomplete codes', () => {
  const now = atUtc('15:27:30');
  for (const code of ['5718', '۵۷۱۸', '٥٧١٨']) {
    assert.equal(matchesTehranCode(normalizeAccessCode(code), now), true);
  }
  for (const code of ['', '718', '305718', '57:18', '57x8']) {
    assert.equal(matchesTehranCode(normalizeAccessCode(code), now), false);
  }
});
