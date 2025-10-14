import './App.css'
import { useApp } from './hooks'
import { Button, Modal, InputNumber, Input } from 'antd'
import { currencyFormatter } from './utils'

const App = () => {
  const {
    setInitialBalance,
    modalCreateAccount,
    errorCreateAccount,
    handleCreateAccount,
    getAccountBalance,
    errorRetrieveAccount,
    account,
    setModalCreateAccount,
    modalRetrieveAccount,
    setModalRetrieveAccount,
    setCurrentId,
    handleCloseCreateAccountModal,
    handleResetRetrieve,
    successMessage,
    setModalTransfer,
    errorTransfer,
    modalTransfer,
    setAmount,
    setSourceId,
    setDestinationId,
    handleTransfer
  } = useApp()
  return (
    <>
      <h1>Transactions</h1>
      <Button onClick={() => setModalCreateAccount(!modalCreateAccount)}>Create Account</Button>
      <Button onClick={() => setModalRetrieveAccount(!modalRetrieveAccount)}>Retrieve Account Balance</Button>
      <Button onClick={() => setModalTransfer(!modalTransfer)}>Transfer Balance</Button>
      <Modal open={modalCreateAccount} onCancel={handleCloseCreateAccountModal} onOk={handleCreateAccount}>
        <h2>Create Account</h2>
        <p style={{ marginBottom: '8px' }}>Initial Balance</p>
        <InputNumber onChange={(value) => setInitialBalance(value as number)} placeholder='Minimum 0 initial balance' style={{ width: '100%' }} />
        { errorCreateAccount && (<p className="error-text">{errorCreateAccount}</p>) }
      </Modal>
      <Modal open={modalRetrieveAccount} onCancel={() => {
        handleResetRetrieve()
        setModalRetrieveAccount(false)
      }} onOk={getAccountBalance}>
        <h2>Retrieve Account</h2>
        <p style={{ marginBottom: '8px' }}>Account ID</p>
        <Input onChange={(e) => setCurrentId(Number(e.target.value))} placeholder='Enter your Account ID' style={{ width: '100%' }} />
        { errorRetrieveAccount && (<p className="error-text">{errorRetrieveAccount}</p>) }
        { account && (
          <>
            <p>Account ID: {account.account_id}</p>
            <p>Balance: {currencyFormatter(account.balance)}</p>
          </>
        )}
      </Modal>
      <Modal open={modalTransfer} onCancel={() => setModalTransfer(false)} onOk={handleTransfer}>
        <h2>Transfer to Account</h2>
        <p>Source Account</p>
        <Input onChange={(e) => setSourceId(Number(e.target.value))} placeholder='Enter source Account ID' style={{ width: '100%' }} />
        <p>Destination Account</p>
        <Input onChange={(e) => setDestinationId(Number(e.target.value))} placeholder='Enter destination Account ID' style={{ width: '100%' }} />
        <p>Amount to Transfer</p>
        <InputNumber onChange={(value) => setAmount(value as number)} placeholder='Minimum $1' style={{ width: '100%' }} />
        { errorTransfer && (<p className="error-text">{errorTransfer}</p>) }
      </Modal>
      { successMessage && (<p className="success-text">{successMessage}</p>) }
    </>
  )
}

export default App
