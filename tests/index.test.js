import Home from '../pages'
import { fireEvent, render, screen } from '@testing-library/react'

describe("render index.tsx", () => {
    test("render test", () => {
        render(<Home />)
    });
    test("input test", () => {
        render(<Home />)
        
        const inputSearch = screen.getByPlaceholderText("Procure pelo título")
        fireEvent.change(inputSearch, {target: {value: '23'}})
        expect(inputSearch.value).toBe("23")
    });
    test("status test", () => {
        render(<Home />)

        const optionsSelect = screen.getByText("Processando")
        // fireEvent.change(optionsSelect, {target: {value: 'processing'}})
        fireEvent.click(optionsSelect)
        
        const listItens = screen.getAllByText("Processando")
        expect(listItens).toHaveLength(6)
    });
})