import { ErrorObject } from 'ajv';
import { AssertionError } from 'assert';

import { RuleSeverity, RuleType } from './enums';
import { Rule } from './rule';

export type TargetSpec = 'oas2' | 'oas3' | string;
export type RawResult = ErrorObject | AssertionError;
export type Path = Array<string | number>;

export interface IRuleOpts<I = Rule> {
  object: any;
  strObj?: string;
  resObj?: any;
  rule: I;
  meta: IRuleMetadata;
}

export type IRuleFunction<I = Rule> = (opts: IRuleOpts<I>) => IRuleResult[];

export interface IRuleResult {
  type: RuleType;

  /**
   * The relevant path within the object being operated on
   */
  path: Path;

  /**
   * The rule emitting the result
   */
  name: string;

  /**
   * The rule summary for the rule generating the result
   */
  summary: string;

  /**
   * The rule emitting the result
   */
  severity: RuleSeverity;

  /**
   * Message describing the error
   */
  message: string;
}

export interface IRuleMetadata {
  path: Path;
  rule: Rule;
  name: string;
}

export interface IRuleset {
  rules: IRuleStore;
  name?: string;
  functions?: {
    // name is be the function name that will be used in rules
    [name: string]: IRuleFunction;
  };
}

export interface IRuleStore {
  /**
   * index is a simplified regex of the format(s) the rules apply to (ie,
   * 'oas2', 'oas3')
   */
  [index: string]: IRuleDeclaration;
}

export interface IRuleDeclaration {
  /**
   * Name of the rule with either a rule definition (when definining/overriding
   * rules) or boolean (when enabling/disabling a default rule)
   */
  [ruleName: string]: Rule | boolean;
}

export * from './rule';
export * from './enums';
