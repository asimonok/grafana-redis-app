import React from 'react';
import { shallow } from 'enzyme';
import { FieldType, toDataFrame, dateTime } from '@grafana/data';
import { Table } from '@grafana/ui';
import { RedisLatencyPanelTable } from './redis-latency-panel-table';
import { FieldName, DisplayNameByFieldName } from '../../types';

/**
 * Latency Panel Table
 */
describe('RedisLatencyPanel', () => {
  /**
   * getTableDataFrame
   */
  describe('getTableDataFrame', () => {
    it('Should add new column with latency values', () => {
      const fields = [
        {
          type: FieldType.string,
          name: FieldName.Command,
          values: ['get', 'info'],
        },
      ];
      const seriesMap = {
        get: [
          {
            time: dateTime(),
            value: 1,
          },
        ],
      };
      const dataFrame = toDataFrame({
        name: 'prev',
        fields,
      });
      const tableDataFrame = RedisLatencyPanelTable.getTableDataFrame(dataFrame, seriesMap);
      const expectedDataFrame = toDataFrame({
        name: 'tableDataFrame',
        fields: [
          ...fields,
          {
            type: FieldType.number,
            name: FieldName.Latency,
            values: [1, 0],
          },
        ].map((field) => ({
          ...field,
          config: {
            displayName: DisplayNameByFieldName[field.name as FieldName],
          },
        })),
      });
      expect(tableDataFrame).toEqual(expectedDataFrame);
    });

    it('Should work without fails if no command field', () => {
      const fields = [
        {
          type: FieldType.number,
          name: FieldName.Calls,
          values: [1, 2],
        },
      ];
      const seriesMap = {};
      const dataFrame = toDataFrame({
        name: 'prev',
        fields,
      });
      const tableDataFrame = RedisLatencyPanelTable.getTableDataFrame(dataFrame, seriesMap);
      const expectedDataFrame = toDataFrame({
        name: 'tableDataFrame',
        fields: [
          ...fields,
          {
            type: FieldType.number,
            name: FieldName.Latency,
            values: [null, null],
          },
        ].map((field) => ({
          ...field,
          config: {
            displayName: DisplayNameByFieldName[field.name as FieldName],
          },
        })),
      });
      expect(tableDataFrame).toEqual(expectedDataFrame);
    });
  });

  /**
   * Rendering
   */
  describe('Rendering', () => {
    const getComponent = (props: any = {}) => <RedisLatencyPanelTable {...props} />;

    it('Should render table', () => {
      const fields = [
        {
          type: FieldType.string,
          name: FieldName.Command,
          values: ['get', 'info'],
        },
      ];
      const seriesMap = {
        get: [
          {
            time: dateTime(),
            value: 1,
          },
        ],
      };
      const dataFrame = toDataFrame({
        name: 'prev',
        fields,
      });
      const wrapper = shallow(getComponent({ dataFrame, seriesMap }));
      const tableComponent = wrapper.find(Table);
      expect(tableComponent.exists()).toBeTruthy();
    });
  });
});