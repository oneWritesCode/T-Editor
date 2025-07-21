import { Color, FontFamily, TextStyle } from '@tiptap/extension-text-style'
import { useEditor } from '@tiptap/react'
import { EditorContent } from '@tiptap/react'
import Heading from '@tiptap/extension-heading'
import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import { FontSize } from '../extensions/FontSize'

export default function Editor() {

    const FontFamilies = ["sans - serif", "serif", "monospace", "verdana"]
    const headings = [0, 1, 2, 3, 4, 5, 6]

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: false,
            }),
            TextStyle,
            Color,
            Highlight,
            FontSize,
            FontFamily,
            Heading.configure({
                levels: [1, 2, 3, 4, 5, 6]
            }),
        ],
        content: `
           Text Editor Project Documentation
           <br/>
           Overview
           <br/>
           This project is a rich text editor built with React and Tiptap. It provides a modern, customizable editing experience for users who want to create and format documents easily.
          <br/>
          <br/>

            Key Features
          <br/>
          Headings:         Supports multiple heading levels (h1-h6) and paragraphs.
          <br/>
          Font Family:         Choose from serif, sans-serif, monospace, and verdana.
          <br/>
          Font Size:         Select any font size from 0px to 99px for precise control.
          <br/>
          Text Styling:         Easily apply bold, italic, and highlight to your text.
          <br/>
          Text Color:         Pick any color for your text using the color picker.
          <br/>
          Live Preview:         See your formatted content instantly as you type.
          
          `,
    })

    return (
        <div className="w-full">

            <div className='w-full flex items-center justify-center'>

                <div className='inline-flex items-center justify-center rounded-xl bg-black px-3 py-1 gap-3'>

                    <button
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        className='h-6 w-6 font-bold rounded-full cursor-pointer hover:bg-[var(--light-background)] border-white/50 '
                    >
                        B
                    </button>

                    <button
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        className='h-6 w-6 italic rounded-full cursor-pointer hover:bg-[var(--light-background)] border-white/50'
                    >
                        I
                    </button>

                    {/* change heading  */}
                    {/* <select
                        className='outline-none cursor-pointer'
                        onChange={(e) => {
                            const level = parseInt(e.target.value, 10)
                            if (level === 0) { editor.chain().focus().setParagraph().run() }
                            else { editor.chain().focus().toggleHeading({ level }).run() }
                        }}
                    >
                        {headings.map((heading, idx) => (
                            <option
                                value={`${heading}`}
                                key={`${idx}`}
                                className='h-6 w-6 text-sm font-medium rounded-full cursor-pointer hover:bg-[var(--light-background)] border-white/50 bg-black'
                            >
                                {heading === 0
                                    ? 'p'
                                    : `h${heading}`}
                            </option>
                        ))}
                    </select> */}

                    {/* select font size  */}
                    <select
                        onChange={(e) =>
                            editor.chain().focus().setFontSize(e.target.value).run()
                        }
                        className="outline-none px-2 py-1 rounded max-h-100 overflow-y-auto [&::-webkit-scrollbar]:w-1  [&::-webkit-scrollbar-track]:bg-neutral-700  [&::-webkit-scrollbar-thumb]:bg-neutral-500 cursor-pointer"
                    >

                        {Array.from({ length: 100 }, (_, i) => (
                            <option
                                key={i}
                                value={`${i}px`}
                                className='h-6 w-6 text-sm font-medium rounded-full cursor-pointer hover:bg-[var(--light-background)] border-white/50 bg-black'
                            >
                                {i}px
                            </option>
                        ))}

                    </select>

                    {/* chane font family  */}
                    <select
                        onChange={(e) => editor.chain().focus().setFontFamily(e.target.value).run()}
                        className="outline-none px-2 py-1 rounded cursor-pointer"
                    >
                        {FontFamilies.map((font, idx) => (
                            <option
                                value={`${font}`}
                                key={idx}
                                className='h-6 w-6 text-sm font-medium rounded-full cursor-pointer hover:bg-[var(--light-background)] border-white/50 bg-black'
                            >
                                {font}</option>
                        ))}
                    </select>

                    {/* highlight */}
                    <button
                        onClick={() => editor.chain().focus().toggleHighlight().run()}
                        className='h-6 text-sm rounded-xl px-2 cursor-pointer hover:bg-[var(--light-background)] border-white/50 '
                    >
                        Highlight
                    </button>

                    {/* change text color */}
                    <input
                        type="color"
                        onInput={(e) =>
                            editor.chain().focus().setColor(e.target.value).run()
                        }
                        className='h-7 w-7 text-sm cursor-pointer hover:bg-[var(--light-background)] border-white/50 '
                    />
                </div>
            </div>


            <div className="w-full flex items-start justify-center mt-10">
                <div
                    className="editorContent w-full max-w-7xl min-h-[80vh] p-10 rounded-xl shadow-lg prose prose-lg"
                    onClick={() => editor?.commands.focus()}
                >
                    <EditorContent
                        editor={editor}
                        className="outline-none min-h-[60vh] cursor-text"
                    />
                </div>
            </div>
        </div>
    )
}