import React, { FunctionComponent, ReactNode } from 'react'
import { Check, Location2 } from '@nutui/icons-react'
import { useConfig } from '@/packages/configprovider'
import { AddressList } from './type'

export interface ExistRenderProps {
  type: string
  existList: AddressList[] | []
  defaultIcon: ReactNode
  selectIcon: ReactNode
  custom: boolean | string
  onSelect?: (item: AddressList) => void
  onSwitch?: (cal: { type: string }) => void
}

const defaultProps = {
  type: 'custom',
  existList: [],
  defaultIcon: null,
  selectIcon: null,
  custom: false,
} as ExistRenderProps

export const ExistRender: FunctionComponent<
  Partial<ExistRenderProps> &
    Omit<
      React.HTMLAttributes<HTMLDivElement>,
      'onChange' | 'title' | 'onSelect'
    >
> = (props) => {
  const { locale } = useConfig()
  const {
    children,
    type,
    existList,
    selectIcon,
    defaultIcon,
    custom,
    onSelect,
    onSwitch,
    ...rest
  } = { ...defaultProps, ...props }
  const classPrefix = 'nut-address'
  const selectedExist = (item: AddressList) => {
    existList.forEach((list: AddressList, index) => {
      ;(list as AddressList).selectedAddress = false
    })

    item.selectedAddress = true
    onSelect && onSelect(item)
  }

  const onClick = () => {
    onSwitch && onSwitch({ type: type === 'exist' ? 'custom' : 'exist' })
  }

  return (
    <>
      <ul className={`${classPrefix}-exist`}>
        {existList.map((item: AddressList, index: number) => {
          return (
            <li
              className={`${classPrefix}-exist-item ${
                item.selectedAddress ? 'active' : ''
              }`}
              key={index}
              onClick={() => selectedExist(item)}
            >
              {item.selectedAddress ? (
                <>
                  {React.isValidElement(selectIcon) ? (
                    selectIcon
                  ) : (
                    <Check color="#FA2C19" />
                  )}
                </>
              ) : (
                <>
                  {React.isValidElement(defaultIcon) ? (
                    defaultIcon
                  ) : (
                    <Location2 />
                  )}
                </>
              )}
              <div className={`${classPrefix}-exist-item-info`}>
                {item.name && item.phone && (
                  <>
                    <div>{item.name}</div>
                    <div>{item.phone}</div>
                  </>
                )}
                <div>
                  {item.provinceName +
                    item.cityName +
                    item.countyName +
                    item.townName +
                    item.addressDetail}
                </div>
              </div>
            </li>
          )
        })}
      </ul>
      {(custom || (custom && locale.address.chooseAnotherAddress)) && (
        <div className={`${classPrefix}-footer`} onClick={onClick}>
          <div className={`${classPrefix}-footer-btn`}>{custom}</div>
        </div>
      )}
    </>
  )
}
