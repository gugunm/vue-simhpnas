<template>
  <div class="c-email-app">
    <div class="c-body flex-row">
      <EmailNav />
      <main class="c-main p-3">
        <p class="text-center">
          New Message
        </p>
        <form>
          <div class="form-row mb-3">
            <label
              for="to"
              class="col-2 col-sm-1 col-form-label"
            >To:</label>
            <CCol
              col="12"
              sm="11"
            >
              <input
                id="to"
                type="email"
                class="form-control"
                placeholder="Type email"
              >
            </CCol>
          </div>
          <div class="form-row mb-3">
            <label
              for="cc"
              class="col-2 col-sm-1 col-form-label"
            >CC:</label>
            <CCol
              col="12"
              sm="11"
            >
              <input
                id="cc"
                type="email"
                class="form-control"
                placeholder="Type email"
              >
            </CCol>
          </div>
          <div class="form-row mb-3">
            <label
              for="bcc"
              class="col-2 col-sm-1 col-form-label"
            >BCC:</label>
            <CCol
              col="12"
              sm="11"
            >
              <input
                id="bcc"
                type="email"
                class="form-control"
                placeholder="Type email"
              >
            </CCol>
          </div>
        </form>
        <CRow>
          <CCol
            sm="11"
            class="ml-auto"
          >
            <div
              class="toolbar"
              role="toolbar"
            >
              <div class="btn-group mr-1">
                <CButton color="light">
                  <CIcon name="cil-bold" />
                </CButton>
                <CButton color="light">
                  <CIcon name="cil-italic" />
                </CButton>
                <CButton color="light">
                  <CIcon name="cil-underline" />
                </CButton>
              </div>
              <div class="btn-group mr-1">
                <CButton color="light">
                  <CIcon name="cil-align-left" />
                </CButton>
                <CButton color="light">
                  <CIcon name="cil-align-right" />
                </CButton>
                <CButton color="light">
                  <CIcon name="cil-align-center" />
                </CButton>
                <CButton color="light">
                  <CIcon name="cil-justify-center" />
                </CButton>
              </div>
              <div class="btn-group mr-1">
                <CButton color="light">
                  <CIcon name="cil-indent-increase" />
                </CButton>
                <CButton color="light">
                  <CIcon name="cil-indent-decrease" />
                </CButton>
              </div>
              <div class="btn-group mr-1">
                <CButton color="light">
                  <CIcon name="cil-list" />
                </CButton>
                <CButton color="light">
                  <CIcon name="cil-list-numbered" />
                </CButton>
              </div>
              <CButton
                color="light"
                class="mr-1"
              >
                <CIcon name="cil-trash" />
              </CButton>
              <CButton color="light">
                <CIcon name="cil-paperclip" />
              </CButton>
              <LabelDropdown />
            </div>
            <div class="form-group mt-4">
              <textarea 
                id="message" 
                class="form-control" 
                name="body" 
                rows="12" 
                placeholder="Click here to reply"
              />
            </div>
            <div class="form-group">
              <CButton
                class="mr-1"
                type="submit"
                color="success"
              >
                Send
              </CButton>
              <CButton
                class="mr-1"
                type="submit"
                color="light"
              >
                Draft
              </CButton>
              <CButton
                class="mr-1"
                type="submit"
                color="danger"
              >
                Discard
              </CButton>
            </div>
          </CCol>
        </CRow>
      </main>
    </div>
  </div>
</template>

<script>
import EmailNav from './EmailNav'
import LabelDropdown from './LabelDropdown'

export default {
  name: 'Compose',
  components: {
    EmailNav,
    LabelDropdown
  }
}
</script>