import { DataQuery, DateTime } from '@grafana/data';
import { ViewMode } from './constants';

/**
 * Panel Options
 */
export interface PanelOptions {
  /**
   * Interval
   *
   * @type {number}
   */
  interval: number;

  /**
   * View Mode
   *
   * @type {ViewMode}
   */
  viewMode: ViewMode;

  /**
   * Max Items
   *
   * @type {number}
   */
  maxItemsPerSeries: number;

  /**
   * Hide Zero series
   *
   * @type {boolean}
   */
  hideZero: boolean;
}

/**
 * Redis Query
 */
export interface RedisQuery extends DataQuery {
  /**
   * Query command
   *
   * @type {string}
   */
  query?: string;

  /**
   * Redis Command type
   *
   * @type {string}
   */
  type?: string;

  /**
   * Redis Command
   *
   * @type {string}
   */
  command?: string;

  /**
   * Redis Section
   *
   * @type {string}
   */
  section?: string;
}

/**
 * Object which keeps SeriesValue[] by command name
 */
export interface SeriesMap {
  [key: string]: SeriesValue[];
}

/**
 * Series Value
 */
export interface SeriesValue {
  time: DateTime;
  value: number;
}

/**
 * Calculation
 */
export interface ValuesForCalculation {
  /**
   * Calls
   */
  calls: number[];

  /**
   * Duration
   */
  duration: number[];
}
