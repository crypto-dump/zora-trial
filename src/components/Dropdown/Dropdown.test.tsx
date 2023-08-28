import { fireEvent, render, screen } from '@testing-library/react'

import Dropdown, { DropdownProps } from './Dropdown'

const defaultProps = {
  label: 'this is label',
  options: ['option1', 'option2', 'option3'],
  onChange: jest.fn(),
}

const buildContainer = (props: DropdownProps = defaultProps): JSX.Element => (
  <Dropdown {...props} />
)

describe('Dropdown', () => {
  describe('With default props', () => {
    beforeEach(() => {
      render(buildContainer())
    })

    it('should show label', () => {
      expect(screen.getByText(defaultProps.label)).toBeInTheDocument()
    })

    describe('on change dropdown', () => {
      beforeEach(() => {
        fireEvent.change(screen.getByTestId('select'), {
          target: { value: defaultProps.options[1] },
        })
      })

      it('should fire onChange event', () => {
        expect(defaultProps.onChange).toHaveBeenCalled()
      })
    })
  })

  describe('With value props', () => {
    beforeEach(() => {
      render(
        buildContainer({ ...defaultProps, value: defaultProps.options[0] })
      )
    })

    it('should show value', () => {
      expect(screen.getByText(defaultProps.options[0])).toBeInTheDocument()
    })
  })
})
