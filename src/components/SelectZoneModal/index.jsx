import React, { useState } from 'react';
import { useRequest } from 'ahooks';
import _ from 'lodash';
import { queryZoneLists } from '@/services/global';
import styles from './index.less';
import SelectZoneModal from './SelectZoneModal';
import { CloseOutlined } from '@ant-design/icons';

const SelectZoneInput = ({ value: propValue, onChange, placeholder }) => {
  const [zoneVisible, setZoneVisible] = useState(false);
  const [value, setValue] = useState([]);
  const [prevData, setPrevData] = useState();

  const { data: zoneListData } = useRequest(queryZoneLists);
  const { data } = zoneListData || [];

  if (prevData !== propValue) {
    if (data) {
      const arr = [];
      setPrevData(propValue);
      _.forEach(propValue, (item) => {
        _.forEach(data, (item2) => {
          if (item === item2.id) {
            arr.push(item2);
          }
        });
      });
      setValue(typeof propValue === 'undefined' ? [] : arr);
    }
  }

  const zoneHandle = () => {
    setZoneVisible(true);
  };

  const removeCheck = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    const newValue = _.filter(value, (item) => item.id !== id);
    setValue(newValue);
    onChange(_.map(newValue, (item) => item.id));
  };

  const selectZoneModalProps = {
    visible: zoneVisible,
    setVisible: setZoneVisible,
    selectZoneData: value,
    zoneData: data,
    onSelect: (val) => {
      setValue(val);
      setZoneVisible(false);
      onChange(_.map(val, (item) => item.id));
    },
  };

  return (
    <>
      <SelectZoneModal {...selectZoneModalProps} />
      <div className={styles.input}>
        {value.length > 0 ? (
          <div className={styles.value} onClick={zoneHandle}>
            {_.map(value, (item) => (
              <span
                style={{
                  border: '1px solid lightgray',
                  borderRadius: 5,
                  padding: '0 5px',
                  margin: '0 3px',
                }}
                key={item.id}
              >
                {item.name}
                <CloseOutlined
                  style={{ fontSize: 12, color: 'lightgray', marginLeft: 5 }}
                  onClick={(e) => removeCheck(e, item.id)}
                />
              </span>
            ))}
          </div>
        ) : (
          <div className={styles.value} onClick={zoneHandle}>
            <span className={styles.placeholder}>{placeholder}</span>
          </div>
        )}
      </div>
    </>
  );
};

export default SelectZoneInput;
