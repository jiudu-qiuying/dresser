<template>
    <div id="app">
        <div class="container">
            <v-touch v-on:swipeleft="left()" v-on:swiperight="right()">
                <i class="el-icon-document container-left-mobile"
                   style="left: -15px;top: 10px;position: absolute;height: 90%;"></i>
            </v-touch>
                <div class="container-left" v-if="!isCollapse">
                    <div class="main-header"  v-if="!isCollapse" >
                        <div class="header-logo"style="width: 200px;height: 80px;background: black;color: white;line-height: 48px;"><h2>LOGO</h2></div>
                    </div>
                    <el-menu default-active="1-4-1" class="el-menu-vertical-demo"
                             :collapse="isCollapse">
                        <!--@open="handleOpen" @close="handleClose" -->
                        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;" class="switch-change">
                            <!--<el-button type="text" @click="changeStatus()" icon="el-icon-menu"></el-button>-->
                        </el-radio-group>
                        <el-submenu index="1">
                            <template slot="title">
                                <i class="el-icon-document"></i>
                                <span slot="title">全部文件</span>
                            </template>
                            <el-menu-item-group>
                                <!--<span slot="title">分组一</span>-->
                                <el-menu-item index="1-1">图片</el-menu-item>
                                <el-menu-item index="1-2">视频</el-menu-item>
                                <el-menu-item index="1-2">音乐</el-menu-item>
                                <el-menu-item index="1-2">文档</el-menu-item>
                            </el-menu-item-group>
                            <!--<el-menu-item-group title="分组2">-->
                            <!--<el-menu-item-group>-->
                            <!--<el-menu-item index="1-3">音乐</el-menu-item>-->
                            <!--</el-menu-item-group>-->
                            <!--<el-submenu index="1-4">-->
                            <!--<span slot="title">选项4</span>-->
                            <!--<el-menu-item index="1-4-1">选项1</el-menu-item>-->
                            <!--</el-submenu>-->
                        </el-submenu>
                        <el-menu-item index="2">
                            <i class="el-icon-share"></i>
                            <span slot="title">我的分享</span>
                        </el-menu-item>
                        <el-menu-item index="3">
                            <i class="el-icon-delete"></i>
                            <span slot="title">回收站</span>
                        </el-menu-item>
                    </el-menu>
                </div>
            <v-touch v-on:swiperight="right()" style="width:100%;">
                <div class="container-right" @click="left()">
                    <el-card class="right-header box-card">
                        <div class="box-card-header">
                            <el-upload
                                    v-show="!isSelected"
                                    class="upload-demo"
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    :on-preview="handlePreview"
                                    :on-remove="handleRemove"
                                    :before-remove="beforeRemove"
                                    multiple
                                    :limit="3"
                                    :on-exceed="handleExceed"
                                    :file-list="fileList">
                                <el-button type="default"  icon="el-icon-upload">上传</el-button>
                                <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
                            </el-upload>
                            <el-button  v-if="isSelected" icon="el-icon-download">下载</el-button>
                            <el-button  v-if="isSelected" icon="el-icon-delete">删除</el-button>
                        </div>
                    </el-card>
                    <el-card class="box-card file-list">
                        <div slot="header" class="box-card-header file-list-header" v-if="currentPageId != 0">
                            <span style="color: dodgerblue;" @click="allFiles">全部文件</span>>
                            <span>新建文件夹</span>
                        </div>
                        <div class="file-list-content">
                            <el-table
                                    ref="multipleTable"
                                    :data="tableData3"
                                    tooltip-effect="dark"
                                    style="width: 100%"
                                    @selection-change="handleSelectionChange"
                            >
                                <el-table-column
                                        type="selection"
                                        width="55"
                                >
                                </el-table-column>
                                <el-table-column
                                        width="35">
                                    <template slot-scope="scope" ><i :class="scope.row.class"></i></template>
                                </el-table-column>
                                <el-table-column
                                        :label="status"
                                        width="150">
                                    <template slot-scope="scope" ><span @click="choiceName(scope.$index, scope.row)">{{ scope.row.name }}</span></template>
                                </el-table-column>
                                <el-table-column
                                        prop="date"
                                        width="120">
                                </el-table-column>
                                <el-table-column
                                        v-if="screenWidth>600"
                                        prop="size"
                                        >
                                </el-table-column>
                            </el-table>
                            <!--<div style="margin-top: 20px">-->
                                <!--<el-button @click="toggleSelection([tableData3[1], tableData3[2]])">切换第二、第三行的选中状态</el-button>-->
                                <!--<el-button @click="toggleSelection()">取消选择</el-button>-->
                            <!--</div>-->
                        </div>
                    </el-card>
                </div>
            </v-touch>
        </div>
        <v-touch v-on:swipeleft="left()" v-on:swiperight="right()">
        <el-button type="primary" icon="el-icon-share" class="add-more" v-if="isSelected" circle></el-button>
        </v-touch>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                isCollapse: false,
                activeName: 'second',
                screenWidth: 0,
                isSelected: false,
                currentPageId:0,
                status: '全选',
//                fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
                fileList: [],
                defaultData:[{
                    class:'fontfamily iconfont-folder',
                    id:1,
                    name: '新建文件夹',
                    date: '2018-08-01',
                    size: ''
                }, {
                    class:'fontfamily iconfont-file',
                    id:2,
                    name: '测试音频.mp3',
                    date: '2018-08-01',
                    size: '3.51M'
                }, {
                    class:'fontfamily iconfont-file',
                    id:3,
                    name: '测试视频.mp4',
                    date: '2018-08-01',
                    size: '99.5K'
                }, {
                    id:4,
                    class:'el-icon-document',
                    name: '测试文档.doc',
                    date: '2018-08-01',
                    size: '220.5K'
                }, {
                    class:'el-icon-picture',
                    id:5,
                    name: '测试图片.png',
                    date: '2018-08-01',
                    size: '120.5K'
                }],
                tableData3:[{
                    class:'fontfamily iconfont-folder',
                    id:1,
                    name: '新建文件夹',
                    date: '2018-08-01',
                    size: ''
                }, {
                    class:'fontfamily iconfont-file',
                    id:2,
                    name: '测试音频.mp3',
                    date: '2018-08-01',
                    size: '3.51M'
                }, {
                    class:'fontfamily iconfont-file',
                    id:3,
                    name: '测试视频.mp4',
                    date: '2018-08-01',
                    size: '99.5K'
                }, {
                    id:4,
                    class:'el-icon-document',
                    name: '测试文档.doc',
                    date: '2018-08-01',
                    size: '220.5K'
                }, {
                    class:'el-icon-picture',
                    id:5,
                    name: '测试图片.png',
                    date: '2018-08-01',
                    size: '120.5K'
                }],
                multipleSelection: []
            };
        },
        watch: {
          screenWidth(newVal){
//              console.log(newVal)
//              if(newVal>600){
//                  this.isCollapse = false;
//              }
          },
        },
        mounted(){
            this.screenWidth = document.body.clientWidth;
            this.isCollapse = false;
        },
        methods: {
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
//                return this.$confirm(`确定移除此文件？`);
            },
            allFiles(){
                this.tableData3 = this.defaultData;
                this.currentPageId = 0;
            },
            choiceName(index,row){
                if(row.id == 1){
                    this.tableData3 = [{
                        class:'el-icon-picture',
                        id:6,
                        name: '爱尚动画.jpg',
                        date: '2018-02-01',
                        size: '12M'
                    }, {
                        class:'fontfamily iconfont-file',
                        id:7,
                        name: '定语从句.mp3',
                        date: '2013-08-01',
                        size: '1.51M'
                    }];
                    this.currentPageId = row.id;
                }
            },
            left(){
                if(this.screenWidth<600){
                    this.isCollapse = true;
                }
            },
            right(){
                this.isCollapse = false;
            },
            rowClick(row, event, column){
                console.log(row)
                console.log(event)
                console.log(column)
            },
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                if(val.length > 0){
                    this.isSelected = true;
                    this.status=`选中了${val.length}条`
                }else{
                    this.isSelected = false;
                    this.status = '全选'
                }
                this.multipleSelection = val;
            }
//            changeStatus(){
//                this.isCollapse = !this.isCollapse;
//            },
//            handleClick(tab, event) {
//                console.log(tab, event);
//            }
//        handleOpen(key, keyPath) {
//            console.log(key, keyPath);
//        },
//        handleClose(key, keyPath) {
//            console.log(key, keyPath);
//        }
        }
    }
</script>

<style lang="less">
    @media screen and (max-width: 600px) {
        .container-right {
            width: 100%;
        }
        .container-left {
            /*display: none;*/
        }
        .container-left-mobile{
            /*display: block;*/
        }

    }
    @media screen and (min-width: 600px) {

        .container-right {
            width: 100%;
        }
        .container-left {
            /*display: block;*/
            .switch-change{
                display: none;
            }
        }
        .container-left-mobile{
            display: none !important;
        }
    }


    #app {
        height: 100%;
        width: 100%;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        /*margin-top: 60px;*/

    }
    .cell{
        padding:0px !important;
    }
    .container{
        display: flex;
        flex-direction: row;
        height: 100%;
        .container-left{
            .el-menu {
                height: 100% !important;
            }
            .main-header{
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
            }
        }
        .container-right{
            height: 100%;
            .right-header{
                /*height: 50px;*/
                .box-card-header{
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-start;
                }
            }
            .box-card {
                .item {
                    margin-bottom: 18px;
                }
            }
            .file-list{
                .file-list-header{
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-start;
                    align-items: center;
                }
                .file-list-content{
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    align-items: flex-start;
                }
            }
        }
    }
    .add-more{
        position: absolute;
        bottom:50px;
        right: 50px;
        z-index: 999 !important;
    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        /*min-height: 400px;*/
        height: 100% !important;
    }

    .el-button--text {
        color: #8c939d;
        font-size: 20px;
    }
</style>
