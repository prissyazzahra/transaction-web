import axios from "axios"
import { useState } from "react"
import type { IAccount } from "../types"
import { currencyFormatter } from "../utils"
import { Form } from "antd"

export const useApp = () => {
  const [modalCreateAccount, setModalCreateAccount] = useState<boolean>(false)
  const [modalRetrieveAccount, setModalRetrieveAccount] = useState<boolean>(false)
  const [modalTransfer, setModalTransfer] = useState<boolean>(false)
  const [errorCreateAccount, setErrorCreateAccount] = useState<string>("")
  const [errorTransfer, setErrorTransfer] = useState<string>("")
  const [successMessage, setSuccessMessage] = useState<string>("")
  const [errorRetrieveAccount, setErrorRetrieveAccount] = useState<string>("")
  const [account, setAccount] = useState<IAccount>()

  const [transferForm] = Form.useForm()
  const [createForm] = Form.useForm()
  const [retrieveForm] = Form.useForm()
  
  const handleCreateAccount = async () => {
    const url = '/api/accounts'
    const values = await createForm.validateFields()
    const { initialBalance } = values

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
      } else {
        setErrorCreateAccount(data)
      }
    })
  }

  const getAccountBalance = async () => {
    const values = await retrieveForm.validateFields()
    const { currentId } = values

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
    const values = await transferForm.validateFields()
    const { sourceId, destinationId, amount } = values
  
    const payload = {
      source_account_id: values.sourceId,
      destination_account_id: values.destinationId,
      amount: values.amount,
    }
    
    if (amount < 1) return setErrorTransfer('Minimum amount for transfer is SGD$1')
    else if (sourceId === destinationId) return setErrorRetrieveAccount("Can't transfer to the same account.")
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
    retrieveForm.resetFields()
    setErrorRetrieveAccount("")
  }

  const handleCloseCreateAccountModal = () => {
    setErrorCreateAccount("")
    setModalCreateAccount(false)
    createForm.resetFields()
  }

  const handleResetTransfer = () => {
    transferForm.resetFields()
    setErrorTransfer("")
  }

  return {
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
    errorTransfer,
    modalTransfer,
    setModalTransfer,
    handleTransfer,
    handleResetTransfer,
    transferForm,
    createForm,
    retrieveForm
  }
}