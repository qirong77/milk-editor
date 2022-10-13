const SVG_SIZE = 12
export const Controlers = () => {

  return (
    <div className="controlers">
      <ul>
        <li>
          <svg
            color="darkred"
            onClick={() => {
              window.api.closeScreen()
            }}
            xmlns="http://www.w3.org/2000/svg"
            width={SVG_SIZE}
            height={SVG_SIZE}
            fill="currentColor"
            className="bi bi-x-circle-fill"
            viewBox="0 0 16 16"
          >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
          </svg>
        </li>
        <li>
          <svg
            color="orange"
            onClick={() => {
              window.api.minScreen()
            }}
            xmlns="http://www.w3.org/2000/svg"
            width={SVG_SIZE}
            height={SVG_SIZE}
            fill="currentColor"
            className="bi bi-dash-circle-fill"
            viewBox="0 0 16 16"
          >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z" />
          </svg>
        </li>
        <li>
          <svg
            color="green"
            onClick={() => {
              window.api.maxScreen()
            }}
            xmlns="http://www.w3.org/2000/svg"
            width={SVG_SIZE}
            height={SVG_SIZE}
            fill="currentColor"
            className="bi bi-plus-circle-fill"
            viewBox="0 0 16 16"
          >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
          </svg>
        </li>
      </ul>
    </div>
  )
}
