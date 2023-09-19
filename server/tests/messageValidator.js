import test from "ava";
import * as messageMocks from './_mocks/messages.js';
import { validateMessage } from "../src/messageValidator.js";

// TESTS

// Each field as missing

// Each field as invalid type

test('valid message:', async t => {
  const isValid = validateMessage(messageMocks.valid);
  t.is(isValid, true);
});

test('invalid Required To:', async t => {
  const isValid = validateMessage(messageMocks.invalidRequiredTo);
  t.is(isValid, false);
});

test('invalid Type To:', async t => {
  const isValid = validateMessage(messageMocks.invalidTypeTo);
  t.is(isValid, false);
});

test('invalid Required To Name:', async t => {
  const isValid = validateMessage(messageMocks.invalidRequiredToName);
  t.is(isValid, false);
});

test('invalid Type To Name:', async t => {
  const isValid = validateMessage(messageMocks.invalidTypeToName);
  t.is(isValid, false);
});

test('invalid Required From:', async t => {
  const isValid = validateMessage(messageMocks.invalidRequiredFrom);
  t.is(isValid, false);
});

test('invalid Type From:', async t => {
  const isValid = validateMessage(messageMocks.invalidTypeFrom);
  t.is(isValid, false);
});

test('invalid Required From Name:', async t => {
  const isValid = validateMessage(messageMocks.invalidRequiredFromName);
  t.is(isValid, false);
});

test('invalid Type From Name:', async t => {
  const isValid = validateMessage(messageMocks.invalidTypeFromName);
  t.is(isValid, false);
});

test('invalid Required Subject:', async t => {
  const isValid = validateMessage(messageMocks.invalidRequiredSubject);
  t.is(isValid, false);
});

test('invalid Type Subject:', async t => {
  const isValid = validateMessage(messageMocks.invalidTypeSubject);
  t.is(isValid, false);
});

test('invalid Required Text:', async t => {
  const isValid = validateMessage(messageMocks.invalidRequiredText);
  t.is(isValid, false);
});

test('invalid Type Text:', async t => {
  const isValid = validateMessage(messageMocks.invalidTypeText);
  t.is(isValid, false);
});