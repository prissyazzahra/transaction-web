import { useApp } from './hooks'
import { Button, Modal, InputNumber, Input, Form } from 'antd'
import { currencyFormatter } from './utils'

const App = () => {
  const {
    modalCreateAccount,
    errorCreateAccount,
    handleCreateAccount,
    setModalCreateAccount,
    handleCloseCreateAccountModal,
    successMessage,

    getAccountBalance,
    errorRetrieveAccount,
    account,
    modalRetrieveAccount,
    setModalRetrieveAccount,
    handleResetRetrieve,
  
    setModalTransfer,
    errorTransfer,
    modalTransfer,
    handleTransfer,
    handleResetTransfer,

    transferForm,
    createForm,
    retrieveForm
  } = useApp()
  return (
    <div className="container">
      <h1>Transactions</h1>
      <div className="button-wrapper">
        <Button className='margin-8' type='primary' onClick={() => setModalCreateAccount(true)}>Create Account</Button>
        <Button className='margin-8' type='primary' onClick={() => setModalRetrieveAccount(true)}>Retrieve Account Balance</Button>
        <Button className='margin-8' type='primary' onClick={() => setModalTransfer(true)}>Transfer Balance</Button>
      </div>
      <Modal open={modalCreateAccount} onCancel={handleCloseCreateAccountModal} onOk={handleCreateAccount} okText="Submit">
        <h2>Create Account</h2>
         <Form
          form={createForm}
          onFinish={handleCreateAccount}
        >
          <Form.Item
            name="initialBalance"
            label="Initial Balance"
          >
            <InputNumber
              addonBefore="SGD$"
              placeholder="Minimum 0 initial balance"
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Form>
        { errorCreateAccount && (<p className="error-text">{errorCreateAccount}</p>) }
      </Modal>
      <Modal open={modalRetrieveAccount} okText="Submit" onCancel={() => {
        handleResetRetrieve()
        setModalRetrieveAccount(false)
      }} onOk={getAccountBalance}>
        <h2>Retrieve Account</h2>
        <Form
          form={retrieveForm}
          onFinish={getAccountBalance}
        >
          <Form.Item
            name="currentId"
            label="Account ID"
          >
            <InputNumber placeholder="Enter Account ID" style={{ width: '100%' }} />
          </Form.Item>
        </Form>
        { errorRetrieveAccount && (<p className="error-text">{errorRetrieveAccount}</p>) }
        { account && (
          <>
            <h3 style={{ marginBottom: '8px' }}>Account Information</h3>
            <div className='info-wrapper'>
              <span className='width-50'>
                <p className='label'>ID</p>
                <p className='label-item'>{account.account_id}</p>
              </span>
              <span className='width-50'>
                <p className='label'>Balance</p>
                <p className='label-item'>{currencyFormatter(account.balance)}</p>
              </span>
            </div>
          </>
        )}
      </Modal>
      <Modal open={modalTransfer} onCancel={() => {
        handleResetTransfer()
        setModalTransfer(false)
      }} onOk={handleTransfer} okText="Submit">
        <h2>Transfer to Account</h2>
        <Form
          form={transferForm}
          onFinish={handleTransfer}
          onReset={handleResetTransfer}
        >
          <Form.Item name="sourceId" label="Source Account">
            <InputNumber placeholder="Enter source Account ID" style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item name="destinationId" label="Destination Account">
            <InputNumber placeholder="Enter destination Account ID" style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item name="amount" label="Amount">
            <InputNumber addonBefore="SGD$" placeholder="Minimum $1" style={{ width: '100%' }} />
          </Form.Item>
        </Form>
        { errorTransfer && (<p className="error-text">{errorTransfer}</p>) }
      </Modal>
      { successMessage && (<p className="success-text">{successMessage}</p>) }
    </div>
  )
}

export default App
