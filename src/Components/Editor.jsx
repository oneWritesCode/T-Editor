import { Color, FontFamily, TextStyle } from '@tiptap/extension-text-style'
import { useEditor } from '@tiptap/react'
import { EditorContent } from '@tiptap/react'
import Heading from '@tiptap/extension-heading'
import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import { FontSize } from '../extensions/FontSize'
import Image from '@tiptap/extension-image';
import { Redo, Undo } from 'lucide-react'
import editorScreenshot from '../assets/images/Teditor-ss.png';
import AestheticOne from '../assets/images/Aesthetic-1.png';

export default function Editor() {

    const FontFamilies = [
        "sans - serif",
        "serif",
        "monospace",
        "Lora",
        "Montserrat",
        "Merriweather",
        "Source Code Pro",
        "Arial",
        "Helvetica",
        "Georgia",
        "Times New Roman",
        "Courier New",
        "Verdana",
        "Trebuchet MS",
        "Lucida Console",
        "Palatino Linotype",
        "Tahoma",
    ]
{/* <img src="${AestheticOne}" alt="Teditor Screenshot" width="400px" height="100px"/> */}
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: false,
            }),
            Image.configure({
                inline: false,
                allowBase64: true,
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
          <strong>&nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp; TEDITOR</strong>
          
          <br />
          
          <br />

          <span>Overview</span>
          <hr />
          <br />
          <span>
          This is a fully customizable rich text editor built using <strong>React</strong> and <strong>TipTap</strong>. Designed for modern web applications, it offers intuitive formatting options and an effortless writing experience.
          </span>
          <br />
          <br/>
          <span style="margin-top: 24px;">🚀 Key Features</span>
          <ul>
          <li> &nbsp;  &nbsp;  •  &nbsp; Supports <strong>paragraphs</strong>, and <strong>horizontal rules</strong></li>
          <li>  &nbsp;  &nbsp; •  &nbsp; Flexible <strong>font family</strong> and <strong>font size</strong> controls</li>
          <li>   &nbsp;  &nbsp; •  &nbsp; Rich <strong>text formatting</strong>: Bold, Italic, Strike-through, Highlight</li>
          <li>  &nbsp;  &nbsp;  •  &nbsp; Inline <strong>color customization</strong></li>
          <li>  &nbsp;  &nbsp;  • &nbsp; <strong>Undo/Redo</strong> functionality for seamless editing</li>
          <li>   &nbsp;  &nbsp; • &nbsp; <strong>Copy-paste images</strong> with base64 support</li>
          </ul>
          <br/>

          <hr/>
          <br/>
          <h2 style="margin-top: 24px;">BUILD WITH RETARDNESS BY <strong>DEEPAK</strong> </h2>
          
            <a href="https://deepak-port.vercel.app" target="_blank">my <strong>portfolio </strong>    </a>
                    <br/>
           <a href="https://github.com/oneWritesCode/T-Editor" target="_blank">contribute <strong>here <3 </strong></a>          
           <br/>
           <a href="https://x.com/triordeep" target="_blank">my <strong>twitter ^_^</strong></a>

           <br/>
           <a href="https://tiptap.dev/docs/editor/getting-started/install/react" target="_blank">TIPTAP docs <strong>here</strong></a>
          </p>

        `,

        editorProps: {
            handlePaste(view, event) {
                const items = Array.from(event.clipboardData?.items || []);
                const imageItem = items.find(item => item.type.includes('image'));

                if (imageItem) {
                    const file = imageItem.getAsFile();
                    const reader = new FileReader();
                    reader.onload = () => {
                        const src = reader.result;
                        editor.chain().focus().setImage({
                            src,
                            width: '300px',
                            height: 'auto'
                        }).run();
                    };
                    reader.readAsDataURL(file);
                    return true;
                }
                return false;
            },
        }
    })

    return (
        <div className="w-full">

            <div className='w-full flex items-center justify-center'>

                <div className='inline-flex items-center justify-center rounded-xl bg-[var(--light-background)] px-3 py-1 gap-1 mr-3'>
                    {/* undo button */}
                    <button
                        onClick={() => editor.chain().focus().undo().run()}
                        className='h-6 w-6 hover:bg-[var(--background-color)] flex items-center justify-center rounded-full cursor-pointer'
                    >
                        <Undo size={18} />
                    </button>

                    {/* redo button */}
                    <button
                        onClick={() => editor.chain().focus().redo().run()}
                        className='h-6 w-6 hover:bg-[var(--background-color)] flex items-center justify-center rounded-full cursor-pointer'
                    >
                        <Redo size={18} />
                    </button>
                </div>

                <div className='inline-flex items-center justify-center rounded-xl bg-[var(--light-background)] px-3 py-1 gap-1'>

                    {/* bold  */}
                    <button
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        className='h-6 hover:bg-black px-2 font-bold rounded-md cursor-pointer'
                    >
                        Bold
                    </button>

                    {/* italic  */}
                    <button
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        className='h-6 hover:bg-black px-2 italic rounded-md cursor-pointer'
                    >
                        Italic
                    </button>

                    {/* strike */}
                    <button
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                        className='h-6 hover:bg-black px-2 line-through rounded-md cursor-pointer'
                    >
                        Strike
                    </button>

                    {/* horizontal line  */}
                    <button
                        onClick={() => editor.chain().focus().setHorizontalRule().run()}
                        className='h-6 text-sm rounded-md font-medium px-2 cursor-pointer hover:bg-black'
                    >
                        Horizontal rule
                    </button>

                    {/* highlight */}
                    <button
                        onClick={() => editor.chain().focus().toggleHighlight().run()}
                        className='h-6 text-sm rounded-md font-medium px-2 cursor-pointer hover:bg-black'
                    >
                        Highlight
                    </button>

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
                                className='h-6 w-6 text-sm bg-black/90'
                            >
                                {i}px
                            </option>
                        ))}

                    </select>

                    {/* change font family  */}
                    <select
                        onChange={(e) => editor.chain().focus().setFontFamily(e.target.value).run()}
                        className="outline-none px-2 py-1 rounded max-h-100 overflow-y-auto [&::-webkit-scrollbar]:w-1  [&::-webkit-scrollbar-track]:bg-neutral-700  [&::-webkit-scrollbar-thumb]:bg-neutral-500 cursor-pointer"
                    >
                        {FontFamilies.map((font, idx) => (
                            <option
                                value={`${font}`}
                                key={idx}
                                className='h-6 w-6 text-sm bg-black/90'
                            >
                                {font}</option>
                        ))}
                    </select>

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
                    className="editorContent w-full p-10 max-w-4xl rounded-xl shadow-lg prose prose-lg"
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