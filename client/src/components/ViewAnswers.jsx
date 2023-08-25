import React, { useEffect, useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import EditText from './EditText'

const ViewAnswers = ({ data, setAnswersArray }) => {
    const [dataArray, setDataArray] = useState([])
    const [deleteProductDialog, setDeleteProductDialog] = useState(false)
    const [answerRow, setAnswerRow] = useState('')

    useEffect(() => {
        setDataArray(data)
    }, [data])

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false)
    }

    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button
                label='No'
                icon='pi pi-times'
                outlined
                onClick={hideDeleteProductDialog}
            />
            <Button
                label='Yes'
                icon='pi pi-check'
                severity='danger'
                onClick={() => {
                    setAnswersArray((prev) => {
                        return prev.filter(
                            (answer) => answer.id != answerRow.id
                        )
                    })
                    setDeleteProductDialog(false)
                }}
            />
        </React.Fragment>
    )

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button
                    type='button'
                    icon='pi pi-trash '
                    rounded
                    outlined
                    severity='danger'
                    size='small'
                    onClick={() => {
                        setAnswerRow(rowData)
                        setDeleteProductDialog(true)
                    }}
                />
            </React.Fragment>
        )
    }

    const onRowEditComplete = (e) => {
        setAnswersArray((prev) => {
            const newData = prev.map((elem) => {
                if (elem.id === e.newData.id) {
                    return e.newData
                } else {
                    return elem
                }
            })

            return newData
        })
    }

    return (
        <div className='card p-fluid'>
            <DataTable
                editMode='row'
                onRowEditComplete={onRowEditComplete}
                value={dataArray}
                stripedRows
                tableStyle={{ minWidth: '10rem' }}
            >
                <Column
                    field='answer'
                    header='Answers'
                    Style={{ width: '60%' }}
                    editor={(options) => <EditText options={options} />}
                    bodyStyle={{ textAlign: 'start' }}
                ></Column>
                <Column
                    rowEditor
                    headerStyle={{ width: '30%', minWidth: 'fit' }}
                    Style={{ width: '30%' }}
                    bodyStyle={{ textAlign: 'end' }}
                ></Column>
                <Column
                    body={actionBodyTemplate}
                    exportable={false}
                    headerStyles={{ width: 'fit', minWidth: 'fit' }}
                    bodyStyle={{ textAlign: 'end', width: '10%' }}
                ></Column>
            </DataTable>

            <Dialog
                visible={deleteProductDialog}
                style={{ width: '32rem' }}
                breakpoints={{ '960px': '75vw', '641px': '90vw' }}
                header='Confirm'
                modal
                footer={deleteProductDialogFooter}
                onHide={hideDeleteProductDialog}
            >
                <div className='confirmation-content'>
                    <i
                        className='pi pi-exclamation-triangle mr-3'
                        style={{ fontSize: '2rem' }}
                    />
                    {answerRow && (
                        <span>
                            Are you sure you want to delete{' '}
                            <b>{answerRow.answer}</b>?
                        </span>
                    )}
                </div>
            </Dialog>
        </div>
    )
}

export default ViewAnswers
