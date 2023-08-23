import React, { useEffect, useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'

const ViewAnswers = ({ data }) => {
    const [dataArray, setDataArray] = useState([])
    const [deleteProductDialog, setDeleteProductDialog] = useState(false)

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
                onClick={() => console.log('deleted kek')}
            />
        </React.Fragment>
    )

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button
                    icon='pi pi-trash '
                    rounded
                    outlined
                    severity='danger'
                    size='small'
                />
            </React.Fragment>
        )
    }

    return (
        <div className='card p-fluid'>
            <DataTable
                editMode='row'
                value={dataArray}
                stripedRows
                tableStyle={{ minWidth: '10rem' }}
            >
                <Column
                    field='answer'
                    header='Answers'
                    bodyStyle={{ textAlign: 'start', width: '75%' }}
                ></Column>
                <Column
                    rowEditor
                    headerStyle={{ width: 'fit', minWidth: 'fit' }}
                    bodyStyle={{ textAlign: 'end', width: '15%' }}
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
                    {dataArray && (
                        <span>
                            Are you sure you want to delete{' '}
                            <b>{dataArray.answer}</b>?
                        </span>
                    )}
                </div>
            </Dialog>
        </div>
    )
}

export default ViewAnswers
