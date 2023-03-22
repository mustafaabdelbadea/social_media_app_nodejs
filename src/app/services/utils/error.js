
export function serviceErrorHandler(error, extra) {
    const errorResponse = {
        message: error.message
    }

    if (extra?.path) {
        errorResponse.path = extra.path
      }
    
      if (extra?.code) {
        errorResponse.code = extra.code
      }

      throw errorResponse
}