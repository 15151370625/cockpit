import React, { useState } from 'react';
import { Modal, Table } from 'antd';
// import { useRequest } from 'ahooks';
import _ from 'lodash';
// import { queryZoneLists } from '@/services/global';

const SelectZoneModal = ({ visible, setVisible, selectZoneData, zoneData, onSelect }) => {
  const [selectKeys, setSelectKeys] = useState([]);
  const [prev, setPrev] = useState();
  // const { data: zoneListData } = useRequest(queryZoneLists);
  // const { data } = zoneListData || [];

  if (prev !== selectZoneData) {
    setPrev(selectZoneData);
    setSelectKeys(_.map(selectZoneData, (item) => item.id));
  }

  const handleOk = () => {
    const arr = [];
    _.forEach(selectKeys, (item) => {
      _.forEach(zoneData, (item2) => {
        if (item === item2.id) {
          arr.push(item2);
        }
      });
    });
    onSelect(arr);
  };

  const columns = [
    {
      title: '园区名',
      dataIndex: 'name',
      key: 'name',
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys) => {
      setSelectKeys(selectedRowKeys);
    },
    selectedRowKeys: selectKeys,
  };

  return (
    <Modal
      title="关联园区"
      visible={visible}
      onOk={handleOk}
      onCancel={() => {
        setVisible(false);
        setSelectKeys(_.map(selectZoneData, (item) => item.id));
      }}
    >
      <Table rowKey="id" rowSelection={rowSelection} columns={columns} dataSource={zoneData} />
    </Modal>
  );
};

export default SelectZoneModal;
