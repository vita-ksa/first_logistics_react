import React from 'react'
import {UseControllerReturn} from 'react-hook-form'
import {ReactComponent as UploadSVG} from 'assets/icons/upload.svg'
import {ReactComponent as FileSVG} from 'assets/icons/file.svg'
import {ClearButton, Image, Label, SymbolBody, UplaodBody, Video} from './Theme'
import {FileUploader} from 'react-drag-drop-files'
import {includes} from 'lodash'

interface InputProps {
  name?: string | any
  rules?: any
  className?: any
  placeholder?: string
  fileTypes?: any
  disabled?: boolean
}

const types = ['jpg', 'png', 'jpeg', 'pdf']

export const FileUpload = ({
  name,
  field,
  formState,
  rules,
  className,
  fieldState,
  placeholder,
  fileTypes,
  disabled = false,
  ...rest
}: UseControllerReturn & InputProps) => {
  const handelClear = () => {
    field?.onChange(null)
  }
  return (
    <div>
      <>
        {field?.value ? (
          <SymbolBody className=' symbol-50px me-2'>
            <span className='overflow-hidden symbol-label w-100 h-100 d-flex flex-column justify-content-center align-items-center bg-light'>
              {field?.value?.files ? (
                field?.value?.files.type.startsWith('image') ? (
                  <Image
                    src={URL.createObjectURL(field?.value?.files)}
                    style={{objectFit: 'cover'}}
                    className='align-self-end w-100 h-100 '
                    alt=''
                  />
                ) : field?.value?.files.type.startsWith('vide') ? (
                  <Video src={URL.createObjectURL(field?.value?.files)} controls={false} autoPlay />
                ) : (
                  <div className='d-flex flex-column justify-content-center align-items-center fw-bold '>
                    <FileSVG />
                    <span className='mt-3'> {field?.value?.files?.name}</span>
                  </div>
                )
              ) : includes(field?.value, '.pdf') ? (
                <div className='d-flex flex-column justify-content-center align-items-center fw-bold '>
                  <FileSVG />
                  <span className='mt-3'>
                    {field?.value?.split('/')?.[field?.value?.split('/')?.length - 1]}
                  </span>
                </div>
              ) : includes(field?.value, '.mp4') ? (
                <Video src={field?.value} controls={false} autoPlay />
              ) : (
                <Image
                  src={field?.value?.url}
                  style={{objectFit: 'cover'}}
                  className='align-self-end w-100 h-100 '
                  alt=''
                />
              )}

              <ClearButton onClick={handelClear}>X</ClearButton>
            </span>
          </SymbolBody>
        ) : (
          <UplaodBody>
            <FileUploader
              className='px-5 my-5 btn bg-light hover:bg-dark w-100'
              type='file'
              id={name}
              name={name}
              types={fileTypes ? fileTypes : types}
              hidden
              handleChange={(_file: any) => {
                field?.onChange({
                  value: _file,
                  files: _file,
                })
              }}
              disabled={disabled}
            >
              <Label
                htmlFor={name}
                className='p-4 my-1 text-left btn bg-light hover:bg-dark w-100 d-flex'
                editMode={field?.value}
              >
                <>
                  <UploadSVG className='me-4' />
                  <strong>{placeholder}</strong>
                </>
              </Label>
            </FileUploader>
          </UplaodBody>
        )}
      </>
    </div>
  )
}
