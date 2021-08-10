import Home, { getStaticProps } from '../pages'
import {fireEvent, render, screen, waitFor } from '@testing-library/react'
import { act } from 'react-dom/test-utils';
import data from './data.json'

describe("render index.tsx", () => {
    test("server side test", async () => {
        await act(async () => {
            const { props } = await getStaticProps();
            expect(props.allTransactions).toStrictEqual(data) 
        })
    });
    test("render test", async () => {
        const { props } = await getStaticProps();
        render(<Home allTransactions={props.allTransactions} />)
    });
    test("input test", async () => {
        await act(async () => {
            const { props } = await getStaticProps();
            render(<Home allTransactions={props.allTransactions} />)
        });

        const inputSearch = screen.getByPlaceholderText("Procure pelo título")
        expect(inputSearch.value).toBe("")
        fireEvent.change(inputSearch, {target: {value: "res"}})
        expect(inputSearch.value).toBe("res")

    });
    test("change status test", async () => {
        await act(async () => {
            const { props } = await getStaticProps();
            render(<Home allTransactions={props.allTransactions} />)
        });

        const optionsSelect = screen.getByTestId("select")
        act(() => {
            fireEvent.change(optionsSelect, {target: {value: 'processing'}})
        })

        expect(optionsSelect.value).toBe('processing')
    });
    test("list update when change to processing status test", async () => {
        await act(async () => {
            const { props } = await getStaticProps();
            render(<Home allTransactions={props.allTransactions} />)
        });

        const optionsSelect = screen.getByTestId("select")
        act(() => {
            fireEvent.change(optionsSelect, {target: {value: 'processing'}})
        })

        expect(optionsSelect.value).toBe('processing')

        const transaction = screen.getAllByTestId("transaction")
        expect(transaction).toHaveLength(7)
    });
    test("list update when change to processing status test", async () => {
        await act(async () => {
            const { props } = await getStaticProps();
            render(<Home allTransactions={props.allTransactions} />)
        });

        const optionsSelect = screen.getByTestId("select")
        act(() => {
            fireEvent.change(optionsSelect, {target: {value: 'created'}})
        })

        expect(optionsSelect.value).toBe('created')

        const transaction = screen.getAllByTestId("transaction")
        expect(transaction).toHaveLength(7)
    });
    test("list update when change to processed status test", async () => {
        await act(async () => {
            const { props } = await getStaticProps();
            render(<Home allTransactions={props.allTransactions} />)
        });

        const optionsSelect = screen.getByTestId("select")
        act(() => {
            fireEvent.change(optionsSelect, {target: {value: 'processed'}})
        })

        expect(optionsSelect.value).toBe('processed')

        const transaction = screen.getAllByTestId("transaction")
        expect(transaction).toHaveLength(7)
    });
    test("list update when change to 'res' in search input", async () => {
        await act(async () => {
            const { props } = await getStaticProps();
            render(<Home allTransactions={props.allTransactions} />)
        });

        const searchInput = screen.getByTestId("search-input")
        act(() => {
            fireEvent.change(searchInput, {target: {value: 'res'}})
        })

        expect(searchInput.value).toBe('res')

        const transaction = screen.getAllByTestId("transaction")
        expect(transaction).toHaveLength(13)
    });
    test("list update when change to 'de' in search input", async () => {
        await act(async () => {
            const { props } = await getStaticProps();
            render(<Home allTransactions={props.allTransactions} />)
        });

        const searchInput = screen.getByTestId("search-input")
        act(() => {
            fireEvent.change(searchInput, {target: {value: 'de'}})
        })

        expect(searchInput.value).toBe('de')

        const transaction = screen.getAllByTestId("transaction")
        expect(transaction).toHaveLength(3)
    });
    test("list update when change to 'mov' in search input", async () => {
        await act(async () => {
            const { props } = await getStaticProps();
            render(<Home allTransactions={props.allTransactions} />)
        });

        const searchInput = screen.getByTestId("search-input")
        act(() => {
            fireEvent.change(searchInput, {target: {value: 'mov'}})
        })

        expect(searchInput.value).toBe('mov')

        const transaction = screen.getAllByTestId("transaction")
        expect(transaction).toHaveLength(5)
    });
    test("list update when change to 'mov' in search input and change status to 'processing'", async () => {
        await act(async () => {
            const { props } = await getStaticProps();
            render(<Home allTransactions={props.allTransactions} />);
        });

        const optionsSelect = screen.getByTestId("select");
        const searchInput = screen.getByTestId("search-input");
        act(() => {
            fireEvent.change(optionsSelect, {target: {value: 'processing'}});
            fireEvent.change(searchInput, {target: {value: 'mov'}});
        })

        expect(searchInput.value).toBe('mov');
        expect(optionsSelect.value).toBe('processing');

        const transaction = screen.getAllByTestId("transaction");
        expect(transaction).toHaveLength(1);
    });
    test("open datailsWindow", async () => {
        await act(async () => {
            const { props } = await getStaticProps();
            render(<Home allTransactions={props.allTransactions} />)
        });

        const transaction = await screen.findByText("et labore proident aute nulla");
        act(() => {
            fireEvent.click(transaction)
        })

        const title = await screen.findByText("Tranferindo de");
        expect(title).toBeTruthy()
    });
    test("details user in datailsWindow", async () => {
        await act(async () => {
            const { props } = await getStaticProps();
            render(<Home allTransactions={props.allTransactions} />)
        });

        const transaction = await screen.findByText("et labore proident aute nulla");
        act(() => {
            fireEvent.click(transaction)
        })

        const title = await screen.findByText("Tranferindo de");
        expect(title).toBeTruthy()

        const date = await screen.findByText("Conta Warren");
        expect(date).toBeTruthy()
    });
    test("close datailsWindow", async () => {
        await act(async () => {
            const { props } = await getStaticProps();
            render(<Home allTransactions={props.allTransactions} />)
        });

        const transaction = await screen.findByText("et labore proident aute nulla");
        act(() => {
            fireEvent.click(transaction)
        })

        const title = await screen.findByText("Tranferindo de");
        expect(title).toBeTruthy()

        const date = await screen.findByText("Conta Warren");
        expect(date).toBeTruthy();

        const closeButton = await screen.getByTestId("close-button")
        act(() => {
            fireEvent.click(closeButton)
        });

        expect(screen.findByText("Tranferindo de").value).toBeUndefined()
    });
})
