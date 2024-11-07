import React, { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { Button, Card, Container, ListGroup, Modal } from 'react-bootstrap';
import { useStore } from '../store';
import ReactMarkdown from 'react-markdown';
import * as matter from 'gray-matter';
import Fuse from 'fuse.js';
import { AdditionalMeta } from './meta';
import { Content } from 'react-bootstrap/lib/Tab';

interface TextNodeProps {
    content: string,
    stopAutoPlay?: boolean
}

export const TextNode = (props: TextNodeProps) => {
    const [content, setContent] = useState({
        content: '',
        data: {
            video: ''
        }
    });

    useEffect(() => {
        fetchFile(props.content) // @ts-ignore
        .then(a => setContent(matter(a)));
    });

    const fetchFile = async (foo: string) => {
        const response = await fetch(foo);
        if (!response.ok) {
            throw new Error(`An error has occured: ${response.status}`);
        }
        const content = await response.text();
        return content;
    }

    return (
        <Container className="textnode">
            <video src={process.env.PUBLIC_URL + '/video/' + content.data.video} controls autoPlay={!props.stopAutoPlay} />
            <ReactMarkdown>{content.content}</ReactMarkdown>
        </Container>
    );
}

interface AnamneseFrage {
    frage: string,
    antwort: string,
    grund: string,
    tags: string,
    punkte: number
}

interface FuseNodeProps {
    content: Array<AnamneseFrage>
}

export interface FuseNodeResult {
    item: AnamneseFrage,
    refIndex: number
}

const options = {
  keys: [
    "frage",
    "tags",
  ]
};

export const FuseNode = (props: FuseNodeProps) => {
    const [query, setQuery] = useState('');
    const [filtered, setFiltered] = useState<FuseNodeResult[]>([]);
    const [explain, setExplain] = useState<FuseNodeResult | undefined>();
    const askQuestion = useStore(state => state.askQuestion);
    const questions = useStore(state => state.questions);
    const fuse = new Fuse(props.content, options);
    const setAdvanceability = useStore(state => state.setAdvanceability);
    
    useEffect(() => {
        setAdvanceability(questions.length >= 5);
    });

    const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
        setQuery(evt.target.value); // @ts-ignore
        setFiltered(fuse.search(query));
        console.log(filtered);
    }
    
    const handleClick = (evt: MouseEvent<HTMLElement>) => {
        let el = evt.target as HTMLElement;
        let question = filtered.filter(f => f.refIndex == el.getAttribute("data-index") as unknown as number)[0];
        setExplain(question);
        askQuestion(question);
    }

    const handleHide = () => setExplain(undefined);

    return (
        <Container>
            <AdditionalMeta>
                { 5 - questions.length } Fragen verbleibend
            </AdditionalMeta>
            <Modal show={!!explain} onHide={handleHide}>
                <Modal.Header closeButton>
                    <Modal.Title>{explain?.item.frage}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {explain?.item.antwort}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleHide}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            {5 - questions.length > 0 ?
            <>
            Stellen Sie Fragen an die Mutter:
            <input className="fuse-input d-block" type="text" onChange={handleChange} placeholder="Ihre Frage" />
            <ListGroup className="mb-4">
                {filtered.filter(question => !questions.map(q => q.refIndex).includes(question.refIndex)).map((f, i) =>
                    <ListGroup.Item key={i} data-index={f.refIndex} onClick={handleClick}>
                        {f.item.frage}
                    </ListGroup.Item>
                )}
            </ListGroup>
            </>
            : <>Keine Fragen verbleibend</> }
        </Container>
        
    );
}

interface Untersuchung {
    lokalisation: Array<string>, 
    type: string,
    befund: string,
    kommentar: string,
    tags: string,
    possible: string,
    points: number
}

interface BodyNodeProps {
    content: Array<Untersuchung>
}

interface quizAnswer {
    text: string,
    points: number,
    explanation: string
}

export interface quizProtocolEntry {
    question: string,
    answers: Array<quizAnswer>
}

interface QuizNodeProps {
    talk?: boolean,
    multiple?: boolean,
    singleResult?: boolean,
    content: {question: string, answers: Array<quizAnswer>}
}

export const QuizNode = (props: QuizNodeProps) => {
    const [answers, setAnswers] = useState(props.content.answers.map(a => { return { selected: false, answer: a } }));
    const [answered, setAnswered] = useState(false);
    const registerAnswer = useStore(state => state.registerAnswer);
    const setAdvanceability = useStore(state => state.setAdvanceability);
    
    useEffect(() => {
        setAdvanceability(answered);
    });

    const handleResult = (evt: MouseEvent) => {
        if (!props.talk) {
            registerAnswer({
                question: props.content.question,
                answers: answers.filter(a => a.selected).map(a => a.answer)
            });
        }
            setAnswered(true);
    }
    
    const handleClick = (evt: MouseEvent) => { // @ts-ignore
        let index = evt.target.getAttribute("data-index");
        if (props.multiple) {
            setAnswers(answers.map((a, i) => i == index ? { selected: !a.selected, answer: a.answer } : a));
        } else {
            setAnswers(answers.map((a, i) => i == index ? { selected: true, answer: a.answer } : { selected: false, answer: a.answer }));
        }
    }

    return (
        <Container>
            <ReactMarkdown>{props.content.question}</ReactMarkdown>
            { answered
                ?
                <>
                    <strong className="d-block mb-3">Auflösung:</strong>
                    {props.singleResult
                    ?
                        <>
                            {answers.filter(a => a.selected).map(a =>
                                <Card bg={a.answer.points > 0 ? "success" : a.answer.points < 0 ? "danger" : "default"}
                                    text={a.answer.points != 0 ? "light" : "dark"}
                                    className="mb-3">
                                    <Card.Header>{a.answer.text}</Card.Header>
                                    <Card.Body>{a.answer.explanation}</Card.Body>
                                    <Card.Footer>{a.answer.points} Punkte {a.selected ? <strong>(von Ihnen gewählt)</strong> : ''}</Card.Footer>
                                </Card>
                            )}
                        </>
                    :
                        <>
                            {answers.filter(a => a.answer.points > 0).map(a =>
                                <Card bg="primary"
                                    text="light"
                                    className="mb-3">
                                    <Card.Header>{a.answer.text}</Card.Header>
                                    { props.talk ? "" : <Card.Body>{a.answer.explanation}</Card.Body>}
                                    <Card.Footer>{a.answer.points} Punkte {a.selected ? <strong>(von Ihnen gewählt)</strong> : ''}</Card.Footer>
                                </Card>

                            )}
                            <strong className="d-block mb-3">Sie haben gewählt:</strong>
                            {answers.filter(a => a.selected).map(a =>
                                <Card bg={a.answer.points > 0 ? "success" : a.answer.points < 0 ? "danger" : "default"}
                                    text={a.answer.points != 0 ? "light" : "dark"}
                                    className="mb-3">
                                    <Card.Header>{a.answer.text}</Card.Header>
                                    { props.talk ? "" : <Card.Body>{a.answer.explanation}</Card.Body>}
                                    <Card.Footer>{a.answer.points} Punkte {a.selected ? <strong>(von Ihnen gewählt)</strong> : ''}</Card.Footer>
                                </Card>

                            )}
                        </>
                    }
                </>
                :
                <>
                    <ListGroup className="answer-wrap">
                        {answers.map((a, i) =>
                            <ListGroup.Item as="button" onClick={handleClick} key={i} variant={a.selected ? "primary" : "default"} data-index={i}>
                                {a.answer.text}
                            </ListGroup.Item>
                        )}
                    </ListGroup>
                    <Button onClick={handleResult} disabled={answers.filter(a => a.selected).length == 0}>{answers.filter(a => a.selected).length == 0 ? "Wählen Sie mindestens eine Antwort aus" : "Antwort abgeben"}</Button>
                </>
            }
        </Container>
    );
}

export const Node: React.FC = (props) => {
    const advanceable = useStore(state => state.advanceable);

    const advance = useStore(state => state.advanceNode);
    const handleClick = () => {
        advance();
    }

    return (
        <>
            { props.children}
            <Container>
                <div className="buttons">
                    <Button disabled={!advanceable}
                        variant="primary"
                        onClick={handleClick}>Weiter</Button>
                </div>
            </Container>
        </>
    );
}