import { RenderHookResult, renderHook, waitFor } from '@testing-library/react'
import { mockSearchResponse } from 'mock/unsplash_mock'

import useGetPhotos, { GetPhotoProps, GetPhotoResult } from './useGetPhotos'

const emptyQuery: GetPhotoProps = {
  query: '',
  page: 1,
}

const validQuery: GetPhotoProps = {
  query: 'test',
  page: 1,
}

const fetchData = jest.fn().mockResolvedValue({ response: mockSearchResponse })

jest.mock('utils/unsplashApi', () => ({
  search: {
    getPhotos: () => fetchData(),
  },
}))

describe('useGetPhotos', () => {
  describe('With empty query', () => {
    let hookResult: RenderHookResult<GetPhotoResult, GetPhotoProps>

    beforeEach(async () => {
      fetchData.mockResolvedValueOnce({
        response: undefined,
      })
      hookResult = renderHook(() => useGetPhotos(emptyQuery))
      await waitFor(() => {
        expect(hookResult.result.current.data).toBeDefined()
      })
    })

    it('should return empty data', () => {
      expect(hookResult.result.current.data?.length).toEqual(0)
    })
  })

  describe('With valid query', () => {
    let hookResult: RenderHookResult<GetPhotoResult, GetPhotoProps>

    beforeEach(async () => {
      hookResult = renderHook(() => useGetPhotos(validQuery))
      await waitFor(() => {
        expect(hookResult.result.current.data).toBeDefined()
      })
    })

    it('should return correct total page count', () => {
      expect(hookResult.result.current.totalPage).toEqual(
        mockSearchResponse.total_pages
      )
    })
  })
})
