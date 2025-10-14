import axios from "axios"
import { useState } from "react"
import type { IAccount } from "../types"
import { currencyFormatter } from "../utils"

export const useApp = () => {
  const [initialBalance, setInitialBalance] = useState<number>(0)
  const [currentId, setCurrentId] = useState<number>(0)
  const [modalCreateAccount, setModalCreateAccount] = useState<boolean>(false)
  const [modalRetrieveAccount, setModalRetrieveAccount] = useState<boolean>(false)
  const [modalTransfer, setModalTransfer] = useState<boolean>(false)
  const [errorCreateAccount, setErrorCreateAccount] = useState<string>("")
  const [errorTransfer, setErrorTransfer] = useState<string>("")
  const [successMessage, setSuccessMessage] = useState<string>("")
  const [errorRetrieveAccount, setErrorRetrieveAccount] = useState<string>("")
  const [account, setAccount] = useState<IAccount>()
  const [sourceId, setSourceId] = useState<number>(0)
  const [destinationId, setDestinationId] = useState<number>(0)
  const [amount, setAmount] = useState<number>(0)
  
  const handleCreateAccount = async () => {
    const url = '/api/accounts'
    if (initialBalance < 0 || initialBalance.toString().length > 17) return setErrorCreateAccount('Please enter a valid balance.')
    const payload = {
      account_id: Math.floor(Math.random() * (999 - 1 + 1)) + 1,
      initial_balance: initialBalance,
    }
    return await axios.post(url, payload).then((res) => {
      setSuccessMessage("Successfully created an account with ID " + res?.data?.account_id + '!')
      handleCloseCreateAccountModal()
    }).catch((err) => {
      const { data } = err.response
      if (data.includes('cannot unmarshal')) {
        setErrorCreateAccount("Unexpected error when creating account.")
      }
    })
  }

  const getAccountBalance = async () => {
    const url = '/api/accounts/' + currentId
    if (currentId === 0) return setErrorRetrieveAccount('Please enter an account ID.')
    handleResetRetrieve()
    return await axios.get(url).then((res) => {
      setAccount(res?.data)
    }).catch((err) => {
      const { data } = err.response

      if (data.includes('invalid syntax')) {
        setErrorRetrieveAccount('Please enter a valid account ID.')
      } else if (data.includes('not found')) {
        setErrorRetrieveAccount('Account with ID ' + currentId + ' does not exist.')
      }
    })
  }

  const handleTransfer = async () => {
    const url = '/api/transactions'
    const payload = {
      source_account_id: sourceId,
      destination_account_id: destinationId,
      amount,
    }
    
    if (amount < 1) return setErrorTransfer('Minimum amount for transfer is SGD$1')
    return await axios.post(url, payload).then(() => {
      setModalTransfer(false)
      setSuccessMessage('Successfully transferred ' + currencyFormatter(amount) + " to Account ID " + destinationId + " from Account ID " + sourceId)
      handleResetTransfer()
    }).catch((err) => {
      setErrorTransfer(err?.response?.data)
    })
  }

  const handleResetRetrieve = () => {
    setAccount(undefined)
    setErrorRetrieveAccount("")
  }

  const handleCloseCreateAccountModal = () => {
    setErrorCreateAccount("")
    setModalCreateAccount(false)
    setInitialBalance(0)
  }

  const handleResetTransfer = () => {
    setSourceId(0)
    setDestinationId(0)
    setAmount(0)
    setErrorTransfer("")
  }

  return {
    setInitialBalance,
    setCurrentId,
    modalCreateAccount,
    setModalCreateAccount,
    modalRetrieveAccount,
    setModalRetrieveAccount,
    errorCreateAccount,
    handleCreateAccount,
    getAccountBalance,
    errorRetrieveAccount,
    account,
    handleCloseCreateAccountModal,
    handleResetRetrieve,
    setAccount,
    successMessage,
    setSourceId,
    setDestinationId,
    setAmount,
    errorTransfer,
    modalTransfer,
    setModalTransfer,
    handleTransfer,
  }
}