import {shallow, mount} from 'enzyme'
import TodoList from '../components/TodoList'

it('TodoList Component is rendered',()=>{
    shallow(<TodoList />)
})

describe('check input fields initial state empty',()=>{
    let wrapper, taskinput, priorityinput, tododata
    beforeEach(()=>{
        wrapper = mount(<TodoList />)
        taskinput = wrapper.find('#taskinput')
        priorityinput = wrapper.find('#priorityinput')
        tododata = wrapper.state('tododata')

    })
    it('check task inputField is empty',()=>{
        expect(taskinput.props().value).toBe('')
    })
    it('check priority select field is Low',() =>{
        expect(priorityinput.props().value).toBe('Low')
    })
    it('check todolist array is empty',()=>{
        expect(tododata).toEqual([])
    })
})

describe('check input event handler',()=>{
    let wrapper, taskinput, priorityinput
    let taskvalue = 'task 1'
    let priorityvalue = 'Low'
    beforeEach(()=>{
        wrapper = mount(<TodoList />)
        taskinput = wrapper.find('#taskinput')
        taskinput.simulate('change',{
            target:{name:'task', value:taskvalue}
        })
        priorityinput = wrapper.find('#priorityinput')    
        priorityinput.simulate('change',{
            target:{name:'priority', value:priorityvalue}
        })
    })
    it('check task input event',()=>{
        expect(wrapper.find('#taskinput').props().value).toBe("task 1")
    })
    it('check priority input event',()=>{
        expect(priorityinput.props().value).toBe(priorityvalue)
    })
})

describe('Check add task function',()=>{
    let wrapper , addtaskfunc
    let arr = {task:'task 1',priority:'Medium'}
    beforeEach(()=>{
        wrapper = mount(<TodoList />) 
        addtaskfunc = wrapper.find('#addtaskform')
        wrapper.setState({taskinput:'task 1',priorityinput:'Medium'})   
    })
    it('Data is added in todolist',()=>{
        addtaskfunc.simulate('submit')
        expect(wrapper.state('tododata')).toContainEqual(arr)
    })
    describe('Check Update task function',()=>{
        beforeEach(()=>{
            wrapper.setState({taskinput:'task 1',priorityinput:'Medium'})
            addtaskfunc.simulate('submit') 
            wrapper.setState({taskinput:'task 3',priorityinput:'High',status:'UPDATE',id:0})
        })
        it('Data is updated in todolist',()=>{
            addtaskfunc.simulate('submit')
            expect(wrapper.state('tododata')).toContainEqual({task:'task 3',priority:'High'})
        })
    })  
})

describe('check  delete function ',()=>{
    let wrapper
    beforeEach(()=>{
        wrapper = mount(<TodoList/>)
        let addtaskfunc = wrapper.find('#addtaskform')
        wrapper.setState({taskinput:'task 1',priorityinput:'Medium'})
        addtaskfunc.simulate('submit') 
    })
    it('Delete function is working',()=>{
        expect(wrapper.state('tododata')).toContainEqual({task:'task 1',priority:'Medium'})
        wrapper.instance().deleteTask(0)
        expect(wrapper.state('tododata')).toStrictEqual([])
    })
})

